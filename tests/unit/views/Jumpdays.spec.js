import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import Jumpdays from "@/views/Jumpdays.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe("Jumpdays.vue", () => {
  let actions;
  let store;
  let getters;

  beforeEach(() => {
    actions = {
      getJumpdaysAction: jest.fn()
    };
    getters = {
      getJumpdayByDate: state => date => state.jumpdays
    };
    store = new Vuex.Store({
      actions,
      getters
    });
  });

  it("renders page", () => {
    const $auth = { getTokenSilently: jest.fn() };
    $auth.getTokenSilently.mockReturnValue("unit-token");
    const wrapper = shallowMount(Jumpdays, {
      store,
      localVue,
      mocks: {
        $auth
      }
    });
    expect(wrapper.find("h1").text()).toBe("Sprungtage");
  });
});
