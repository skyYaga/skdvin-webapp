import { GET_WAIVERS, UPDATE_WAIVERS } from "../mutation-types";
import { waiverService } from "../../shared/waiver-service";

const state = () => ({
  waivers: [],
});

const getters = {};

/* eslint-disable no-unused-vars */
const actions = {
  async saveWaiverAction({ commit }, payload) {
    return await waiverService.saveWaiver(payload.waiver);
  },
  async getWaiverAction({ commit }, token) {
    const result = await waiverService.getWaiver(token);
    commit(GET_WAIVERS, result.payload);
    return result;
  },
  async updateWaiverAction({ commit }, payload) {
    const result = await waiverService.updateWaiver(
      payload.waiver,
      payload.token
    );
    if (result.success) {
      commit(UPDATE_WAIVERS, result.payload);
    }
    return result;
  },
};
/* eslint-enable no-unused-vars */

const mutations = {
  [GET_WAIVERS](state, waivers) {
    state.waivers = waivers;
  },
  [UPDATE_WAIVERS](state, waiver) {
    const index = state.waivers.findIndex((w) => w.id === waiver.id);
    state.waivers.splice(index, 1, waiver);
    state.waivers = [...state.waivers];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
