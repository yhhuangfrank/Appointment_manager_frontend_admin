import { createRouter, createWebHistory } from "vue-router";
import List from "../pages/List.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/hostpital/list",
      component: List,
    },
  ],
});

export default router;
