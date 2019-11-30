import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import App from "@/App.vue";

Vue.use(Vuetify);

describe("App.vue", () => {
  it("shows login button when not authenticated", () => {
    const $auth = { isAuthenticated: false };
    const msg = "Log in";
    const wrapper = shallowMount(App, {
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth
      }
    });
    expect(wrapper.html()).toContain(msg);
  });
  it("shows logout button when authenticated", () => {
    const $auth = { isAuthenticated: true };
    const msg = "Log out";
    const wrapper = shallowMount(App, {
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth
      }
    });
    expect(wrapper.html()).toContain(msg);
  });
  it("displays public menu when not authenticated", () => {
    const $auth = { isAuthenticated: false };
    const wrapper = shallowMount(App, {
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth
      }
    });
    expect(wrapper.html()).not.toContain("Profile");
  });
  it("displays profile menu when authenticated", () => {
    const $auth = { isAuthenticated: true };
    const wrapper = shallowMount(App, {
      stubs: ["router-link", "router-view"],
      mocks: {
        $auth
      }
    });
    expect(wrapper.html()).toContain("Profile");
  });
});
