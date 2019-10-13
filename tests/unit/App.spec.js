import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
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
