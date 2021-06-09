import { jumpdayService } from "../../shared/jumpday-service";
import {
  GET_JUMPDAYS,
  ADD_JUMPDAY,
  UPDATE_JUMPDAY,
  DELETE_JUMPDAY,
} from "../mutation-types";

const state = () => ({
  jumpdays: [],
});

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  getJumpdayByDate: (state) => (date) =>
    state.jumpdays.find((j) => j.date === date),
};

/* eslint-disable no-unused-vars */
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
};
/* eslint-enable no-unused-vars */

const mutations = {
  [GET_JUMPDAYS](state, jumpdays) {
    state.jumpdays = jumpdays;
  },
  [ADD_JUMPDAY](state, jumpday) {
    state.jumpdays.unshift(jumpday); // mutable addition
  },
  [UPDATE_JUMPDAY](state, jumpday) {
    const index = state.jumpdays.findIndex((j) => j.date === jumpday.date);
    state.jumpdays.splice(index, 1, jumpday);
    state.jumpdays = [...state.jumpdays];
  },
  [DELETE_JUMPDAY](state, date) {
    state.jumpdays = [...state.jumpdays.filter((j) => j.date !== date)];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
