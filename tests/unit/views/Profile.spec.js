import { shallowMount } from "@vue/test-utils";
import Profile from "@/views/Profile.vue";

describe("Profile.vue", () => {
  it("should render user details", () => {
    const $auth = {
      user: {
        name: "Bob",
        email: "bob@example.com"
      }
    };
    const wrapper = shallowMount(Profile, {
      mocks: {
        $auth
      }
    });
    expect(wrapper.find("h2").text()).toMatch($auth.user.name);
    expect(wrapper.find("p").text()).toMatch($auth.user.email);
  });
});
