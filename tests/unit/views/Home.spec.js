import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import Home from "@/views/Home.vue";
import BookAppointment from "@/components/BookAppointment.vue";

Vue.use(Vuetify);

describe("Home.vue", () => {
  it("contains BookAppointment component", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.find(BookAppointment)).toBeDefined();
  });
});
