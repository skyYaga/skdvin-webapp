import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import ProfileView from "@/views/ProfileView.vue";

Vue.use(Vuetify);

describe("ProfileView.vue", () => {
  it("should render user details", () => {
    const $auth = {
      user: {
        name: "Bob",
        email: "bob@example.com",
      },
    };
    const wrapper = shallowMount(ProfileView, {
      mocks: {
        $auth,
        $t: (msg) => msg,
      },
    });
    expect(wrapper.find("h2").text()).toMatch(this.$auth0.user.email);
  });
});
