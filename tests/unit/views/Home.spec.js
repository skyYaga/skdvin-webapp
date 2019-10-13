import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe("Home.vue", () => {
  it("shows login button when not authenticated", () => {
    const $auth = { isAuthenticated: false };
    const msg = "Log in";
    const wrapper = shallowMount(Home, {
      mocks: {
        $auth
      }
    });
    expect(wrapper.find("button").text()).toMatch(msg);
  });
  it("shows logout button when authenticated", () => {
    const $auth = { isAuthenticated: true };
    const msg = "Log out";
    const wrapper = shallowMount(Home, {
      mocks: {
        $auth
      }
    });
    expect(wrapper.find("button").text()).toMatch(msg);
  });
});
