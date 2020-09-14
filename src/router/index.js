import Vue from "vue";
import VueRouter from "vue-router";
import DefaultLayout from "../layouts/Default.vue";
import SearchFlights from "../views/Search.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: SearchFlights,
        alias: "/search"
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
