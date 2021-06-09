import {
  ADD_VIDEOFLYER,
  UPDATE_VIDEOFLYER,
  GET_VIDEOFLYERS,
  DELETE_VIDEOFLYER,
} from "../mutation-types";
import { videoflyerService } from "../../shared/videoflyer-service";

const state = () => ({
  videoflyers: [],
});

const getters = {};

/* eslint-disable no-unused-vars */
const actions = {
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
};
/* eslint-enable no-unused-vars */

const mutations = {
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
