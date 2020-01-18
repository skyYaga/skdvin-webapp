import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import Jumpdays from "@/views/Jumpdays.vue";

Vue.use(Vuetify);

describe("Jumpdays.vue", () => {
  it("renders page", () => {
    const wrapper = shallowMount(Jumpdays);
    expect(wrapper.find("h1").text()).toBe("Sprungtage");
  });
});
