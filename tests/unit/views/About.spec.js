import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import About from "@/views/About.vue";

Vue.use(Vuetify);

describe("About.vue", () => {
  it("should render heading", () => {
    const msg = "This is an about page";
    const wrapper = shallowMount(About);
    expect(wrapper.text()).toMatch(msg);
  });
});
