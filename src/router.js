import { createWebHistory, createRouter } from 'vue-router';

import HomeView from './views/HomeView.vue';
import DetailsView from './views/DetailsView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/details/:id', component: DetailsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
