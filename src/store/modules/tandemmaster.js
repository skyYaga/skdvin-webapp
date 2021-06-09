import {
  ADD_TANDEMMASTER,
  UPDATE_TANDEMMASTER,
  GET_TANDEMMASTERS,
  DELETE_TANDEMMASTER,
} from "../mutation-types";
import { tandemmasterService } from "../../shared/tandemmaster-service";

const state = () => ({
  tandemmasters: [],
});

const getters = {};

/* eslint-disable no-unused-vars */
const actions = {
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
};
/* eslint-enable no-unused-vars */

const mutations = {
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
