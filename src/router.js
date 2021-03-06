import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { authGuard } from "./auth/authGuard";
import i18n from "./i18n.js";
import RouterView from "./components/RouterView";

Vue.use(Router);

const parseProps = (r) => ({ id: parseInt(r.params.id) });

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/:lang",
      component: RouterView,
      beforeEnter(to, from, next) {
        const lang = to.params.lang;
        if (!i18n.availableLocales.includes(lang)) return next("de");
        if (i18n.locale !== lang) {
          i18n.locale = lang;
        }
        return next();
      },
      children: [
        {
          path: "",
          redirect: "/" + i18n.locale + "/home",
        },
        {
          path: "home",
          name: "home",
          component: Home,
        },
        {
          path: "faq",
          name: "faq",
          component: () => import("./views/Faq.vue"),
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("./views/Profile.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "jumpdays",
          name: "jumpdays",
          component: () => import("./views/Jumpdays.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "appointments",
          name: "appointments",
          component: () => import("./views/Appointments.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "appointments/:id",
          props: parseProps,
          name: "appointment-details",
          component: () => import("./views/AppointmentDetails.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "appointment/confirm",
          name: "appointment-confirm",
          component: () => import("./views/AppointmentConfirm.vue"),
        },
        {
          path: "appointment/verify",
          name: "appointment-verify",
          component: () => import("./views/AppointmentVerify.vue"),
        },
        {
          path: "tandemmaster",
          name: "tandemmaster",
          component: () => import("./views/Tandemmaster.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "videoflyer",
          name: "videoflyer",
          component: () => import("./views/Videoflyer.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "research",
          name: "research",
          component: () => import("./views/Research.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "settings/general",
          name: "general-settings",
          component: () => import("./views/GeneralSettings.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "settings/users",
          name: "user-settings",
          component: () => import("./views/UserSettings.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "settings/waiver",
          name: "waiver-settings",
          component: () => import("./views/settings/WaiverSettings.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "tandem/waiver/create",
          name: "tandem-waiver",
          component: () => import("./views/waiver/TandemWaiver.vue"),
        },
        {
          path: "tandem/waiver/confirm",
          name: "waiver-confirm",
          component: () => import("./views/waiver/WaiverConfirm.vue"),
        },
        {
          path: "tandem/waiver/overview",
          name: "waiver-overview",
          component: () => import("./views/waiver/WaiverOverview.vue"),
          beforeEnter: authGuard,
        },
      ],
    },
    {
      path: "*",
      redirect: "/de",
    },
  ],
});
