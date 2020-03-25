import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import App from "@/App.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe("App.vue", () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      setLocaleAction: jest.fn()
    };
    store = new Vuex.Store({
      actions
    });
  });
  it("contains Navbar", () => {
    const msg = "navbar";
    const wrapper = shallowMount(App, {
      store,
      localVue,
      mocks: { $i18n: { locale: "de", t: message => message } },
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.html()).toContain(msg);
  });
  it("contains Router View", () => {
    const msg = "router-view";
    const wrapper = shallowMount(App, {
      store,
      localVue,
      mocks: { $i18n: { locale: "de", t: message => message } },
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.html()).toContain(msg);
  });
});
