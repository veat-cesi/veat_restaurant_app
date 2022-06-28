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
      id: "62ba76e3d6c6c9cc09ba20c4"
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductPage,
    props:{
      id: "62ba76e3d6c6c9cc09ba20c4"
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