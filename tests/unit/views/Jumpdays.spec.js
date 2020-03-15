import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import Jumpdays from "@/views/Jumpdays.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);
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
        $auth,
        $t: msg => msg
      }
    });
    wrapper.setData({ loading: false, authorized: true });
    await localVue.nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find("h1").text()).toBe("jumpday.jumpdays");
  });
  it("renders Unauthorized alert when not authorized", async () => {
    jumpersActionMock.mockReturnValueOnce(403);
    const $auth = { getTokenSilently: jest.fn() };
    $auth.getTokenSilently.mockReturnValue("unit-token");
    const wrapper = shallowMount(Jumpdays, {
      store,
      localVue,
      mocks: {
        $auth,
        $t: msg => msg
      }
    });
    await localVue.nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toMatch("accessdenied");
  });
  it("renders loading when not loaded", async () => {
    const $auth = { getTokenSilently: jest.fn() };
    $auth.getTokenSilently.mockReturnValue("unit-token");
    const wrapper = shallowMount(Jumpdays, {
      store,
      localVue,
      mocks: {
        $auth,
        $t: msg => msg
      }
    });
    expect(wrapper.text()).toMatch("jumpday.loading");
  });
});
