import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import Dashboard from "./views/Dashboard.vue";
import HelloWorld from "./components/HelloWorld.vue";
import MainLayout from "./layouts/MainLayout.vue";
import "./style.css";
import Table from "./views/Table.vue";
import Page from "./components/page.vue";
import Exit from "./components/Exit.vue";
import Catalog from "./views/Catalog.vue";
import PipeCost from "./views/PipeCost.vue";
import Polygon from "./views/Polygon.vue";
import Cipu from "./views/Cipu.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        component: Dashboard,
      },
      {
        path: "/info",
        component: HelloWorld,
      },
      {
        path: "/table",
        component: Table,
      },
      {
        path: "/page/:page",
        component: Page,
      },
      {
        path: "/exit",
        component: Exit,
      },
      {
        path: "/catalog-works",
        component: Catalog,
      },
      {
        path: "/pipe-cost",
        component: PipeCost,
      },
      {
        path: "/polygon",
        component: Polygon,
      },
      {
        path: "/cipu",
        component: Cipu,
      },
    ],
  },
];

// Crear instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Crear app y usar router
const app = createApp(App);
app.use(router); // Esta línea es crucial
app.mount("#app");
