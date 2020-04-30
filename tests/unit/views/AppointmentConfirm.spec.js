import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import AppointmentConfirm from "@/views/AppointmentConfirm.vue";

Vue.use(Vuetify);

describe("AppointmentConfirm.vue", () => {
  it("shows success alert when no message ist passed", () => {
    const $route = {
      query: {},
    };
    const wrapper = shallowMount(AppointmentConfirm, {
      mocks: { $route, $t: (msg) => msg },
    });
    expect(wrapper.find("h3").text()).toMatch("almostdone");
  });
  it("shows error alert when message ist passed", () => {
    const $route = {
      query: {
        message: "error",
      },
    };
    const wrapper = shallowMount(AppointmentConfirm, {
      mocks: { $route, $t: (msg) => msg },
    });
    expect(wrapper.find("h3").text()).toMatch("error.occurred");
  });
});
