import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { authGuard } from "./auth/authGuard";

Vue.use(Router);

const parseProps = (r) => ({ id: parseInt(r.params.id) });

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/jumpdays",
      name: "jumpdays",
      component: () => import("./views/Jumpdays.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/appointments",
      name: "appointments",
      component: () => import("./views/Appointments.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/appointments/:id",
      props: parseProps,
      name: "appointment-details",
      component: () => import("./views/AppointmentDetails.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/appointment/confirm",
      name: "appointment-confirm",
      component: () => import("./views/AppointmentConfirm.vue"),
    },
    {
      path: "/appointment/verify",
      name: "appointment-verify",
      component: () => import("./views/AppointmentVerify.vue"),
    },
    {
      path: "/tandemmaster",
      name: "tandemmaster",
      component: () => import("./views/Tandemmaster.vue"),
      beforeEnter: authGuard,
    },
    {
      path: "/videoflyer",
      name: "videoflyer",
      component: () => import("./views/Videoflyer.vue"),
      beforeEnter: authGuard,
    },
  ],
});
