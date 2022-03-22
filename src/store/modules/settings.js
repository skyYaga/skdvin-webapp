import {
  UPDATE_LOCAL_SETTINGS,
  GET_COMMON_SETTINGS,
  SET_SETTINGS,
} from "../mutation-types";
import { settingsService } from "../../shared/settings-service";

const state = () => ({
  settings: {
    startHour: "09",
    startMinute: "30",
    endHour: "18",
    endMinute: "00",
    tandem: 5,
    picOrVid: 0,
    picAndVid: 0,
    handcam: 0,
    sequence: "1:30",
  },
  commonSettings: {
    dropzone: {
      name: "",
      email: "",
    },
  },
});

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  getSettings: (state) => () => state.settings,
  getCommonSettings: (state) => () => state.commonSettings,
  // parameterized getters are not cached. so this is just a convenience to get the state.
  getFaq: (state) => () => state.commonSettings.faq,
};

/* eslint-disable no-unused-vars */
const actions = {
  updateLocalSettingsAction({ commit }, settings) {
    commit(UPDATE_LOCAL_SETTINGS, settings);
  },
  async getSettingsAction({ commit }, token) {
    const result = await settingsService.getSettings(token);
    commit(SET_SETTINGS, result.payload);
    return result;
  },
  async saveSettingsAction({ commit }, payload) {
    return await settingsService.saveSettings(payload.settings, payload.token);
  },
  async updateSettingsAction({ commit, state }, payload) {
    if (!Object.prototype.hasOwnProperty.call(payload, "settings")) {
      payload.settings = state.settings;
    }
    const result = await settingsService.updateSettings(
      payload.settings,
      payload.token
    );
    commit(SET_SETTINGS, result.payload);
    return result;
  },
  async getCommonSettingsAction({ commit }) {
    const result = await settingsService.getCommonSettings(this.state.locale);
    commit(GET_COMMON_SETTINGS, result.payload);
  },
};
/* eslint-enable no-unused-vars */

const mutations = {
  [UPDATE_LOCAL_SETTINGS](state, settings) {
    state.settings = settings;
  },
  [GET_COMMON_SETTINGS](state, commonSettings) {
    state.commonSettings = commonSettings;
  },
  [SET_SETTINGS](state, settings) {
    state.settings = settings;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
