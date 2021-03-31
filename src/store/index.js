import Vue from "vue";
import Vuex from "vuex";
import {
  UPDATE_APPOINTMENT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT_STATE,
  DELETE_APPOINTMENT,
  GET_GROUP_SLOTS,
  ADD_TANDEMMASTER,
  UPDATE_TANDEMMASTER,
  GET_TANDEMMASTERS,
  DELETE_TANDEMMASTER,
  ADD_VIDEOFLYER,
  UPDATE_VIDEOFLYER,
  GET_VIDEOFLYERS,
  DELETE_VIDEOFLYER,
  SET_LOCALE,
} from "./mutation-types";
import jumpday from "./modules/jumpday";
import settings from "./modules/settings";

import { appointmentService } from "../shared/appointment-service";
import { tandemmasterService } from "../shared/tandemmaster-service";
import { videoflyerService } from "../shared/videoflyer-service";
import { userService } from "../shared/user-service";

Vue.use(Vuex);

const state = () => ({
  appointments: [],
  appointment: null,
  tandemmasters: [],
  videoflyers: [],
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
  [GET_TANDEMMASTERS](state, tandemmasters) {
    state.tandemmasters = tandemmasters;
  },
  [ADD_TANDEMMASTER](state, tandemmaster) {
    state.tandemmasters.unshift(tandemmaster); // mutable addition
  },
  [UPDATE_TANDEMMASTER](state, tandemmaster) {
    const index = state.tandemmasters.findIndex(
      (t) => t.id === tandemmaster.id
    );
    state.tandemmasters.splice(index, 1, tandemmaster);
    state.tandemmasters = [...state.tandemmasters];
  },
  [DELETE_TANDEMMASTER](state, id) {
    state.tandemmasters = [...state.tandemmasters.filter((t) => t.id !== id)];
  },
  [GET_VIDEOFLYERS](state, videoflyers) {
    state.videoflyers = videoflyers;
  },
  [ADD_VIDEOFLYER](state, videoflyer) {
    state.videoflyers.unshift(videoflyer); // mutable addition
  },
  [UPDATE_VIDEOFLYER](state, videoflyer) {
    const index = state.videoflyers.findIndex((t) => t.id === videoflyer.id);
    state.videoflyers.splice(index, 1, videoflyer);
    state.videoflyers = [...state.videoflyers];
  },
  [DELETE_VIDEOFLYER](state, id) {
    state.videoflyers = [...state.videoflyers.filter((t) => t.id !== id)];
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
  async addTandemmasterAction({ commit }, payload) {
    const result = await tandemmasterService.addTandemmaster(
      payload.tandemmaster,
      payload.token
    );
    commit(ADD_TANDEMMASTER, result.payload);
    return result;
  },
  async getTandemmasterAction({ commit }, token) {
    const result = await tandemmasterService.getTandemmaster(token);
    commit(GET_TANDEMMASTERS, result.payload);
    return result;
  },
  async updateTandemmasterAction({ commit }, payload) {
    const result = await tandemmasterService.updateTandemmaster(
      payload.tandemmaster,
      payload.token
    );
    commit(UPDATE_TANDEMMASTER, result.payload);
    return result;
  },
  async deleteTandemmasterAction({ commit }, payload) {
    const result = await tandemmasterService.deleteTandemmaster(
      payload.id,
      payload.token
    );
    commit(DELETE_TANDEMMASTER, payload.id);
    return result;
  },
  async getTandemmasterDetailsAction({ commit }, payload) {
    const appointment = await tandemmasterService.getTandemmasterDetails(
      payload.tandemmasterId,
      payload.token
    );
    return appointment;
  },
  async getMeTandemmasterAction({ commit }, token) {
    return await tandemmasterService.getMeTandemmaster(token);
  },
  async updateTandemmasterAssigmentsAction({ commit }, payload) {
    return await tandemmasterService.updateTandemmasterAssigments(
      payload.tandemmasterDetails,
      payload.token
    );
  },
  async updateMeTandemmasterAssigmentsAction({ commit }, payload) {
    return await tandemmasterService.updateMeTandemmasterAssigments(
      payload.tandemmasterDetails,
      payload.token
    );
  },
  async addVideoflyerAction({ commit }, payload) {
    const result = await videoflyerService.addVideoflyer(
      payload.videoflyer,
      payload.token
    );
    commit(ADD_VIDEOFLYER, result.payload);
    return result;
  },
  async getVideoflyerAction({ commit }, token) {
    const result = await videoflyerService.getVideoflyer(token);
    commit(GET_VIDEOFLYERS, result.payload);
    return result;
  },
  async updateVideoflyerAction({ commit }, payload) {
    const result = await videoflyerService.updateVideoflyer(
      payload.videoflyer,
      payload.token
    );
    commit(UPDATE_VIDEOFLYER, result.payload);
    return result;
  },
  async deleteVideoflyerAction({ commit }, payload) {
    const result = await videoflyerService.deleteVideoflyer(
      payload.id,
      payload.token
    );
    commit(DELETE_VIDEOFLYER, payload.id);
    return result;
  },
  async getVideoflyerDetailsAction({ commit }, payload) {
    const videoflyer = await videoflyerService.getVideoflyerDetails(
      payload.videoflyerId,
      payload.token
    );
    return videoflyer;
  },
  async getMeVideoflyerAction({ commit }, token) {
    return await videoflyerService.getMeVideoflyer(token);
  },
  async updateVideoflyerAssigmentsAction({ commit }, payload) {
    return await videoflyerService.updateVideoflyerAssigments(
      payload.videoflyerDetails,
      payload.token
    );
  },
  async updateMeVideoflyerAssigmentsAction({ commit }, payload) {
    return await videoflyerService.updateMeVideoflyerAssigments(
      payload.videoflyerDetails,
      payload.token
    );
  },
  setLocaleAction({ commit }, locale) {
    commit(SET_LOCALE, locale);
  },
  async getUsersAction({ commit }, token) {
    return await userService.getUsers(token);
  },
  async updateUserAction({ commit }, payload) {
    return await userService.updateUser(payload.user, payload.token);
  },
  async getRolesAction({ commit }, token) {
    return await userService.getRoles(token);
  },
};
/* eslint-enable no-unused-vars */

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  getFaq: (state) => () => state.commonSettings.faq,
};

export default new Vuex.Store({
  modules: {
    jumpday,
    settings,
  },
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters,
});
