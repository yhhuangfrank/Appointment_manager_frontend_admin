import { createRouter, createWebHistory } from "vue-router";
import List from "../pages/List.vue";
import Save from "../pages/Save.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/hospital/list",
    },
    {
      path: "/hospital/list",
      component: List,
    },
    { path: "/hospital/add", component: Save },
    {
      path: "/hospital/edit/:id",
      name: "edit_hospital",
      component: Save,
    },
  ],
});

export default router;
