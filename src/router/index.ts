import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import ProductPage from '../views/ProductPage.vue'
import CommandPage from '../views/CommandPage.vue'
import RestaurantPage from '../views/RestaurantPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/commands'
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
    component: ProductPage,
    props:{
      id: "62bb018b33ee48838342f25b"
    }
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

export default router;