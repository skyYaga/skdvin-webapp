import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import Home from "@/views/Home.vue";
import HelloWorld from "@/components/HelloWorld.vue";

Vue.use(Vuetify);

describe("Home.vue", () => {
  it("shows Welcome to Vuetify heading", () => {
    const wrapper = mount(Home);
    expect(wrapper.find(HelloWorld)).toBeDefined();
  });
});
