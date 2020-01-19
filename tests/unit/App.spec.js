import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import App from "@/App.vue";

Vue.use(Vuetify);

describe("App.vue", () => {
  it("contains Navbar", () => {
    const msg = "navbar";
    const wrapper = shallowMount(App, {
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.html()).toContain(msg);
  });
  it("contains Router View", () => {
    const msg = "router-view";
    const wrapper = shallowMount(App, {
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.html()).toContain(msg);
  });
});
