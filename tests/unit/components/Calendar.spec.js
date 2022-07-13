import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import CalendarPicker from "@/components/CalendarPicker.vue";

Vue.use(Vuetify);

describe("CalendarPicker.vue", () => {
  it("renders CalendarPicker", () => {
    const wrapper = shallowMount(CalendarPicker, {
      mocks: { $i18n: { locale: "de" } },
    });
    expect(wrapper.find("v-calendar")).toBeDefined();
  });
});
