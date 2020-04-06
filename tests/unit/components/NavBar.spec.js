import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";

Vue.use(Vuetify);

describe("NavBar.vue", () => {
  it("shows login button when not authenticated", () => {
    const $auth = { isAuthenticated: false };
    const msg = "login";
    const wrapper = shallowMount(NavBar, {
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
