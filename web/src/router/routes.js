const routes = [
  {
    path: "/",
    component: () => import("layouts/EmptyLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/subjects",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/SubjectPage.vue") },
      { path: ":id(\\d+)", component: () => import("pages/LevelsPage.vue") },
    ],
  },
  {
    path: "/levels",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/404" },
      { path: ":id(\\d+)", component: () => import("pages/GamePage/IndexPage.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
