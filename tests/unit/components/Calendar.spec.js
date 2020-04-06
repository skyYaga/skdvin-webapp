import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import Calendar from "@/components/Calendar.vue";

Vue.use(Vuetify);

describe("Calendar.vue", () => {
  it("renders Calendar", () => {
    const wrapper = shallowMount(Calendar, {
      mocks: { $i18n: { locale: "de" } },
    });
    expect(wrapper.find("v-calendar")).toBeDefined();
  });
});
