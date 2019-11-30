import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

Vue.use(Vuetify);

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.find("h1").text()).toMatch(msg);
  });
  it("renders Welcome to Vuetify heading", () => {
    const msg = "Welcome to Vuetify";
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.find("h1.display-2").text()).toMatch(msg);
  });
});
