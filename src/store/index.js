import Vue from "vue";
import Vuex from "vuex";
import {
  UPDATE_APPOINTMENT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT_STATE,
  DELETE_APPOINTMENT,
  GET_GROUP_SLOTS,
  SET_LOCALE,
} from "./mutation-types";
import jumpday from "./modules/jumpday";
import settings from "./modules/settings";
import tandemmaster from "./modules/tandemmaster";
import videoflyer from "./modules/videoflyer";

import { appointmentService } from "../shared/appointment-service";
import { legacyVoucherService } from "../shared/legacy-voucher-service";
import { userService } from "../shared/user-service";

Vue.use(Vuex);

const state = () => ({
  appointments: [],
  appointment: null,
  locale: null,
  groupSlots: [],
});

const mutations = {
  [GET_APPOINTMENTS](state, appointments) {
    state.appointments = appointments;
  },
  [UPDATE_APPOINTMENT](state, appointment) {
    const index = state.appointments.findIndex(
      (a) => a.appointmentId === appointment.appointmentId
    );
    state.appointments.splice(index, 1, appointment);
    state.appointments = [...state.appointments];
  },
  [DELETE_APPOINTMENT](state, appointmentId) {
    state.appointments = [
      ...state.appointments.filter((a) => a.appointmentId !== appointmentId),
    ];
  },
  [UPDATE_APPOINTMENT_STATE](state, result) {
    const index = state.appointments?.findIndex(
      (a) => a.appointmentId === result.appointmentId
    );
    state.appointments[index].state = result.appointmentState;
    state.appointments = [...state.appointments];
  },
  [GET_GROUP_SLOTS](state, slots) {
    state.groupSlots = slots;
  },
  [SET_LOCALE](state, locale) {
    state.locale = locale;
  },
};

/* eslint-disable no-unused-vars */
const actions = {
  async searchSlotsAction({ commit }, query) {
    const slots = await appointmentService.searchSlots(query);
    return slots;
  },
  async addAppointmentAction({ commit }, appointment) {
    const result = await appointmentService.saveAppointment(
      appointment,
      this.state.locale
    );
    return result;
  },
  async addAdminAppointmentAction({ commit }, payload) {
    const result = await appointmentService.saveAdminAppointment(
      payload.appointment,
      payload.token
    );
    return result;
  },
  async verifyAppointmentAction({ commit }, payload) {
    const result = await appointmentService.verifyAppointment(
      payload.id,
      payload.token,
      this.state.locale
    );
    return result;
  },
  async getAppointmentsAction({ commit }, payload) {
    const appointments = await appointmentService.getAppointments(
      payload.date,
      payload.token
    );
    appointments.sort(function (a, b) {
      if (a === null) return 1;
      if (b === null) return -1;
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.date) - new Date(b.date);
    });
    commit(GET_APPOINTMENTS, appointments);
  },
  async getAppointmentAction({ commit }, payload) {
    const appointment = await appointmentService.getAppointment(
      payload.appointmentId,
      payload.token
    );
    return appointment;
  },
  async updateAppointmentStateAction({ commit }, payload) {
    await appointmentService.updateAppointmentState(
      payload.appointmentId,
      payload.appointmentState,
      payload.token
    );
    commit(UPDATE_APPOINTMENT_STATE, {
      appointmentId: payload.appointmentId,
      appointmentState: payload.appointmentState.state,
    });
  },
  async updateAppointmentAction({ commit }, payload) {
    let result = await appointmentService.updateAppointment(
      payload.appointment,
      payload.token,
      this.state.locale
    );
    if (result.success) {
      commit(UPDATE_APPOINTMENT, result.payload);
    }
    return result;
  },
  async updateAdminAppointmentAction({ commit }, payload) {
    let result = await appointmentService.updateAdminAppointment(
      payload.appointment,
      payload.token
    );
    if (result.success) {
      commit(UPDATE_APPOINTMENT, result.payload);
    }
    return result;
  },
  async deleteAppointmentAction({ commit }, payload) {
    let result = await appointmentService.deleteAppointment(
      payload.appointmentId,
      payload.token,
      this.state.locale
    );
    if (result.success) {
      commit(DELETE_APPOINTMENT, payload.appointmentId);
    }
    return result;
  },
  async getGroupSlotsAction({ commit }, payload) {
    const result = await appointmentService.getGroupSlots(
      payload.query,
      payload.token
    );
    commit(GET_GROUP_SLOTS, result.payload);
  },
  setLocaleAction({ commit }, locale) {
    commit(SET_LOCALE, locale);
  },
  async getUsersAction({ commit }, payload) {
    return await userService.getUsers(
      payload.page,
      payload.itemsPerPage,
      payload.token
    );
  },
  async updateUserAction({ commit }, payload) {
    return await userService.updateUser(payload.user, payload.token);
  },
  async getRolesAction({ commit }, token) {
    return await userService.getRoles(token);
  },
  async getLegacyVoucherAction({ commit }, payload) {
    return await legacyVoucherService.searchVoucher(payload.id, payload.token);
  },
  async redeemLegacyVoucherAction({ commit }, payload) {
    return await legacyVoucherService.redeemVoucher(payload.id, payload.token);
  },
};
/* eslint-enable no-unused-vars */

const getters = {};

export default new Vuex.Store({
  modules: {
    jumpday,
    settings,
    tandemmaster,
    videoflyer,
  },
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters,
});
