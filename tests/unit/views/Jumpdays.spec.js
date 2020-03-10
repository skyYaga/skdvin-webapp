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
  const jumpersActionMock = jest.fn();

  beforeEach(() => {
    actions = {
      getJumpdaysAction: jumpersActionMock
    };
    getters = {
      getJumpdayByDate: state => date => state.jumpdays
    };
    store = new Vuex.Store({
      actions,
      getters
    });
  });
  it("renders page when authorized", async () => {
    jumpersActionMock.mockReturnValueOnce("");
    const $auth = { getTokenSilently: jest.fn() };
    $auth.getTokenSilently.mockReturnValue("unit-token");
    const wrapper = shallowMount(Jumpdays, {
      store,
      localVue,
      mocks: {
        $auth
      }
    });
    wrapper.setData({ loading: false, authorized: true });
    await localVue.nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find("h1").text()).toBe("Sprungtage");
  });
  it("renders Unauthorized alert when not authorized", async () => {
    jumpersActionMock.mockReturnValueOnce(403);
    const $auth = { getTokenSilently: jest.fn() };
    $auth.getTokenSilently.mockReturnValue("unit-token");
    const wrapper = shallowMount(Jumpdays, {
      store,
      localVue,
      mocks: {
        $auth
      }
    });
    await localVue.nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toMatch("Ups! Leider kein Zugriff :-(");
  });
  it("renders loading when not loaded", async () => {
    const $auth = { getTokenSilently: jest.fn() };
    $auth.getTokenSilently.mockReturnValue("unit-token");
    const wrapper = shallowMount(Jumpdays, {
      store,
      localVue,
      mocks: {
        $auth
      }
    });
    expect(wrapper.text()).toMatch("loading jumpdays, please be patient...");
  });
});
