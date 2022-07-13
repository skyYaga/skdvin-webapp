import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import HomeView from "@/views/HomeView.vue";
import BookAppointment from "@/components/BookAppointment.vue";

Vue.use(Vuetify);

describe("HomeView.vue", () => {
  it("contains BookAppointment component", () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.find(BookAppointment)).toBeDefined();
  });
});
