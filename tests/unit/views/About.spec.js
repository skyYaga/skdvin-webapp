import { shallowMount } from "@vue/test-utils";
import About from "@/views/About.vue";

describe("About.vue", () => {
  it("should render heading", () => {
    const msg = "This is an about page";
    const wrapper = shallowMount(About);
    expect(wrapper.text()).toMatch(msg);
  });
});
