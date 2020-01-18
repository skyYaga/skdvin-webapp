import Vue from "vue";
import Vuex from "vuex";
import { GET_JUMPDAYS, ADD_JUMPDAY } from "./mutation-types";
import { jumpdayService } from "../shared/jumpday-service";

Vue.use(Vuex);

const state = () => ({
  jumpdays: []
});

const mutations = {
  [GET_JUMPDAYS](state, jumpdays) {
    state.jumpdays = jumpdays;
  },
  [ADD_JUMPDAY](state, jumpday) {
    state.jumpdays.unshift(jumpday); // mutable addition
  }
};

const actions = {
  async getJumpdaysAction({ commit }, token) {
    const jumpdays = await jumpdayService.getJumpdays(token);
    commit(GET_JUMPDAYS, jumpdays);
  },
  async addJumpdayAction({ commit }, jumpday, token) {
    const addedJumpday = await jumpdayService.addJumpday(jumpday, token);
    commit(ADD_JUMPDAY, addedJumpday);
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
