import Vue from "vue";
import Router from "vue-router";
import HomeView from "./views/HomeView.vue";
import { authGuard } from "./auth/authGuard";
import i18n from "./i18n.js";
import RouterView from "./components/RouterView";

Vue.use(Router);

const parseProps = (r) => ({ id: parseInt(r.params.id) });

let router = new Router({
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
          component: HomeView,
        },
        {
          path: "faq",
          name: "faq",
          component: () => import("./views/FaqView.vue"),
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("./views/ProfileView.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "jumpdays",
          name: "jumpdays",
          component: () => import("./views/JumpdaysView.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "appointments",
          name: "appointments",
          component: () => import("./views/AppointmentsView.vue"),
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
          component: () => import("./views/TandemmasterView.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "videoflyer",
          name: "videoflyer",
          component: () => import("./views/VideoflyerView.vue"),
          beforeEnter: authGuard,
        },
        {
          path: "research",
          name: "research",
          component: () => import("./views/ResearchView.vue"),
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
          path: "legacy-vouchers",
          name: "legacy-vouchers",
          component: () => import("./views/LegacyVouchers.vue"),
          beforeEnter: authGuard,
        },
      ],
    },
    {
      path: "*",
      redirect: "/de",
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
});

router.onError((error) => {
  // eslint-disable-next-line
  console.error(error);
  if (
    /ChunkLoadError:.*failed./i.test(error.message) ||
    /Loading.*chunk.*failed./i.test(error.message)
  ) {
    // eslint-disable-next-line
    console.error("Reloading Window...");
    window.location.reload();
  }
});

export default router;
