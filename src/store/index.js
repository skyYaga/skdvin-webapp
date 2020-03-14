import Vue from "vue";
import Vuex from "vuex";
import {
  GET_JUMPDAYS,
  ADD_JUMPDAY,
  UPDATE_JUMPDAY,
  DELETE_JUMPDAY,
  UPDATE_APPOINTMENT,
  GET_APPOINTMENTS,
  UPDATE_APPOINTMENT_STATE,
  DELETE_APPOINTMENT
} from "./mutation-types";
import { jumpdayService } from "../shared/jumpday-service";
import { appointmentService } from "../shared/appointment-service";

Vue.use(Vuex);

const state = () => ({
  jumpdays: [],
  appointments: [],
  appointment: null
});

const mutations = {
  [GET_JUMPDAYS](state, jumpdays) {
    state.jumpdays = jumpdays;
  },
  [ADD_JUMPDAY](state, jumpday) {
    state.jumpdays.unshift(jumpday); // mutable addition
  },
  [UPDATE_JUMPDAY](state, jumpday) {
    const index = state.jumpdays.findIndex(j => j.date === jumpday.date);
    state.jumpdays.splice(index, 1, jumpday);
    state.jumpdays = [...state.jumpdays];
  },
  [DELETE_JUMPDAY](state, date) {
    state.jumpdays = [...state.jumpdays.filter(j => j.date !== date)];
  },
  [GET_APPOINTMENTS](state, appointments) {
    state.appointments = appointments;
  },
  [UPDATE_APPOINTMENT](state, appointment) {
    const index = state.appointments.findIndex(
      a => a.appointmentId === appointment.appointmentId
    );
    state.appointments.splice(index, 1, appointment);
    state.appointments = [...state.appointments];
  },
  [DELETE_APPOINTMENT](state, appointmentId) {
    state.appointments = [
      ...state.appointments.filter(a => a.appointmentId !== appointmentId)
    ];
  },
  [UPDATE_APPOINTMENT_STATE](state, result) {
    const index = state.appointments?.findIndex(
      a => a.appointmentId === result.appointmentId
    );
    state.appointments[index].state = result.appointmentState;
    state.appointments = [...state.appointments];
  }
};

const actions = {
  async getJumpdaysAction({ commit }, token) {
    const jumpdays = await jumpdayService.getJumpdays(token);
    if (typeof jumpdays === "number") {
      return jumpdays;
    }
    commit(GET_JUMPDAYS, jumpdays);
    return "";
  },
  async addJumpdayAction({ commit }, payload) {
    const result = await jumpdayService.addJumpday(
      payload.jumpday,
      payload.token
    );
    if (result.success) {
      commit(ADD_JUMPDAY, result.payload);
    }
    return result;
  },
  async deleteJumpdayAction({ commit }, payload) {
    let result = await jumpdayService.deleteJumpday(
      payload.date,
      payload.token
    );
    if (result.success) {
      commit(DELETE_JUMPDAY, payload.date);
    }
    return result;
  },
  async searchSlotsAction({ commit }, query) {
    const slots = await appointmentService.searchSlots(query);
    return slots;
  },
  async addAppointmentAction({ commit }, appointment) {
    const result = await appointmentService.saveAppointment(appointment);
    return result;
  },
  async verifyAppointmentAction({ commit }, payload) {
    const result = await appointmentService.verifyAppointment(
      payload.id,
      payload.token
    );
    return result;
  },
  async getAppointmentsAction({ commit }, payload) {
    const appointments = await appointmentService.getAppointments(
      payload.date,
      payload.token
    );
    appointments.sort(function(a, b) {
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
      appointmentState: payload.appointmentState.state
    });
  },
  async updateAppointmentAction({ commit }, payload) {
    let result = await appointmentService.updateAppointment(
      payload.appointment,
      payload.token
    );
    if (result.success) {
      commit(UPDATE_APPOINTMENT, result.payload);
    }
    return result;
  },
  async updateJumpdayAction({ commit }, payload) {
    let result = await jumpdayService.updateJumpday(
      payload.jumpday,
      payload.token
    );
    if (result.success) {
      commit(UPDATE_JUMPDAY, result.payload);
    }
    return result;
  },
  async deleteAppointmentAction({ commit }, payload) {
    let result = await appointmentService.deleteAppointment(
      payload.appointmentId,
      payload.token
    );
    if (result.success) {
      commit(DELETE_APPOINTMENT, payload.appointmentId);
    }
    return result;
  }
};

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  getJumpdayByDate: state => date => state.jumpdays.find(j => j.date === date)
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters
});
