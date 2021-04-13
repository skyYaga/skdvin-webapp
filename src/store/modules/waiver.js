import { waiverService } from "../../shared/waiver-service";

const state = () => ({});

const getters = {};

/* eslint-disable no-unused-vars */
const actions = {
  async saveWaiverAction({ commit }, payload) {
    return await waiverService.saveWaiver(payload.waiver);
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
