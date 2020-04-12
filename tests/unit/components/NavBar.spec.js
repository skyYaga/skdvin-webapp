import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import NavBar from "@/components/NavBar.vue";

const localVue = createLocalVue();

localVue.use(Vuetify);
localVue.use(Vuex);

describe("NavBar.vue", () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      getCommonSettings: (state) => () => {
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
  });
  it("shows login button when not authenticated", () => {
    const $auth = { isAuthenticated: false };
    const msg = "login";
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth,
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
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth,
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
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth,
        $t: (msg) => msg,
      },
    });
    expect(wrapper.html()).not.toContain(
      "<v-list-item-title-stub>profile</v-list-item-title-stub>"
    );
  });
  it("displays profile menu when authenticated", () => {
    const $auth = { isAuthenticated: true };
    const wrapper = shallowMount(NavBar, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth,
        $t: (msg) => msg,
      },
    });
    expect(wrapper.html()).toContain(
      "<v-list-item-title-stub>profile</v-list-item-title-stub>"
    );
  });
});
