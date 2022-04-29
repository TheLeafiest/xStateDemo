import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/more",
      component: () => import("@/views/MoreView.vue"),
      children: [
        {
          path: "",
          name: "more",
          component: () => import("@/views/MoreLandingView.vue"),
        },
        {
          path: "auth",
          name: "authDemo",
          component: () => import("@/views/AuthDemoView.vue"),
        },
        {
          path: "form",
          name: "formDemo",
          component: () => import("@/views/FormDemoView.vue"),
        },
      ],
    },
  ],
});

export default router;
