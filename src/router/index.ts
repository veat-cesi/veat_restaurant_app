import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue'
import ProductPage from '../views/ProductPage.vue'
import CommandPage from '../views/CommandPage.vue'
import RestaurantPage from '../views/RestaurantPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboards'
  },
  {
    path: '/dashboards',
    name: 'Dashboards',
    component: DashboardPage
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    component: RestaurantPage
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductPage
  },
  {
    path: '/commands',
    name: 'Commands',
    component: CommandPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
