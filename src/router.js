import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { authGuard } from "./auth/authGuard";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: authGuard
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/jumpdays",
      name: "jumpdays",
      component: () => import("./views/Jumpdays.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/appointment/confirm",
      name: "appointment-confirm",
      component: () => import("./views/AppointmentConfirm.vue"),
      beforeEnter: authGuard
    },
    {
      path: "/appointment/verify",
      name: "appointment-verify",
      component: () => import("./views/AppointmentVerify.vue"),
      beforeEnter: authGuard
    }
  ]
});
