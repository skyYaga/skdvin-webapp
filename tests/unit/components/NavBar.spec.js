import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import NavBar from "@/components/NavBar.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("NavBar.vue", () => {
  let store;
  let getters;
  let vuetify;

  beforeEach(() => {
    getters = {
      getCommonSettings: () => () => {
        return {
          dropzone: {
            name: "Example DZ",
          },
        };
      },
    };
    store = new Vuex.Store({
      getters,
    });
    vuetify = new Vuetify();
  });
  it("shows login button when not authenticated", () => {
    const $auth = { isAuthenticated: false };
    const msg = "login";
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      vuetify,
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth,
        $i18n: { locale: "de", t: (message) => message },
        $t: (msg) => msg,
      },
    });
    expect(wrapper.html()).toContain(msg);
  });
  it("shows logout button when authenticated", () => {
    const $auth = { isAuthenticated: true };
    const msg = "logout";
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      vuetify,
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth,
        $i18n: { locale: "de", t: (message) => message },
        $t: (msg) => msg,
      },
    });
    expect(wrapper.html()).toContain(msg);
  });
  it("displays public menu when not authenticated", () => {
    const $auth = { isAuthenticated: false };
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      vuetify,
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth,
        $i18n: { locale: "de", t: (message) => message },
        $t: (msg) => msg,
      },
    });
    expect(wrapper.html()).not.toContain(
      "<v-list-item-title>profile</v-list-item-title>"
    );
  });
  it("displays profile menu when authenticated", () => {
    const $auth = { isAuthenticated: true };
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      vuetify,
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth,
        $i18n: { locale: "de", t: (message) => message },
        $t: (msg) => msg,
      },
    });
    expect(wrapper.html()).toContain(
      "<v-list-item-title>profile</v-list-item-title>"
    );
  });
});
