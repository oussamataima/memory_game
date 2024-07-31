import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/PlayView.vue'),
      props: (route) => ({grid: Number(route.query.grid), theme: String(route.query.theme), numPlayers: Number(route.query.numPlayers)}),
    }
  ]
})

export default router
