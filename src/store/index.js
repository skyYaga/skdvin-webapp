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
  DELETE_APPOINTMENT,
  ADD_TANDEMMASTER,
  UPDATE_TANDEMMASTER,
  GET_TANDEMMASTERS,
  DELETE_TANDEMMASTER,
  ADD_VIDEOFLYER,
  UPDATE_VIDEOFLYER,
  GET_VIDEOFLYERS,
  DELETE_VIDEOFLYER,
  SET_LOCALE,
  UPDATE_SETTINGS
} from "./mutation-types";
import { jumpdayService } from "../shared/jumpday-service";
import { appointmentService } from "../shared/appointment-service";
import { tandemmasterService } from "../shared/tandemmaster-service";
import { videoflyerService } from "../shared/videoflyer-service";

Vue.use(Vuex);

const state = () => ({
  jumpdays: [],
  appointments: [],
  appointment: null,
  tandemmasters: [],
  videoflyers: [],
  locale: null,
  settings: {
    startHour: "9",
    startMinute: "30",
    endHour: "18",
    endMinute: "00",
    tandem: 5,
    picOrVid: 0,
    picAndVid: 0,
    handcam: 0,
    sequence: "1:30"
  }
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
  },
  [GET_TANDEMMASTERS](state, tandemmasters) {
    state.tandemmasters = tandemmasters;
  },
  [ADD_TANDEMMASTER](state, tandemmaster) {
    state.tandemmasters.unshift(tandemmaster); // mutable addition
  },
  [UPDATE_TANDEMMASTER](state, tandemmaster) {
    const index = state.tandemmasters.findIndex(t => t.id === tandemmaster.id);
    state.tandemmasters.splice(index, 1, tandemmaster);
    state.tandemmasters = [...state.tandemmasters];
  },
  [DELETE_TANDEMMASTER](state, id) {
    state.tandemmasters = [...state.tandemmasters.filter(t => t.id !== id)];
  },
  [GET_VIDEOFLYERS](state, videoflyers) {
    state.videoflyers = videoflyers;
  },
  [ADD_VIDEOFLYER](state, videoflyer) {
    state.videoflyers.unshift(videoflyer); // mutable addition
  },
  [UPDATE_VIDEOFLYER](state, videoflyer) {
    const index = state.videoflyers.findIndex(t => t.id === videoflyer.id);
    state.videoflyers.splice(index, 1, videoflyer);
    state.videoflyers = [...state.videoflyers];
  },
  [DELETE_VIDEOFLYER](state, id) {
    state.videoflyers = [...state.videoflyers.filter(t => t.id !== id)];
  },
  [SET_LOCALE](state, locale) {
    state.locale = locale;
  },
  [UPDATE_SETTINGS](state, settings) {
    state.settings = settings;
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
    const result = await appointmentService.saveAppointment(
      appointment,
      this.state.locale
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
      payload.token,
      this.state.locale
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
      payload.token,
      this.state.locale
    );
    if (result.success) {
      commit(DELETE_APPOINTMENT, payload.appointmentId);
    }
    return result;
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
  async updateTandemmasterAssigmentsAction({ commit }, payload) {
    const result = await tandemmasterService.updateTandemmasterAssigments(
      payload.tandemmasterDetails,
      payload.token
    );
    return result;
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
    const appointment = await videoflyerService.getVideoflyerDetails(
      payload.videoflyerId,
      payload.token
    );
    return appointment;
  },
  async updateVideoflyerAssigmentsAction({ commit }, payload) {
    const result = await videoflyerService.updateVideoflyerAssigments(
      payload.videoflyerDetails,
      payload.token
    );
    return result;
  },
  setLocaleAction({ commit }, locale) {
    commit(SET_LOCALE, locale);
  },
  updateSettingsAction({ commit }, settings) {
    commit(UPDATE_SETTINGS, settings);
  }
};

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  getJumpdayByDate: state => date => state.jumpdays.find(j => j.date === date),
  getSettings: state => () => state.settings
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  mutations,
  actions,
  getters
});
