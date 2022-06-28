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
    component: RestaurantPage,
    props:{
      id: "62bb018b33ee48838342f25b"
    }
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
