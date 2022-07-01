import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import ProductPage from "../views/ProductPage.vue";
import OrderPage from "../views/OrderPage.vue";
import RestaurantPage from "../views/RestaurantPage.vue";
import ProductDetailPage from "../views/ProductDetailPage.vue";
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import CPU from '../views/CPU.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/orders",
  },
  {
    path: "/restaurant",
    name: "Restaurant",
    component: RestaurantPage,
    props: {
      id: "62bdc614ae62ea3f28d00bd6",
    },
  },
  {
    path: '/cpu',
    name: 'CPU',
    component: CPU
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path:'/login',
    name:'LoginPage',
    component: LoginPage
  },
  {
    path: "/products",
    name: "Products",
    component: ProductPage,
    props: {
      id: "62bdc614ae62ea3f28d00bd6",
    },
  },
  {
    path: "/products/detail/:id",
    name: "ProductDetail",
    component: ProductDetailPage,
    props: {
      restaurantId: "62bdc614ae62ea3f28d00bd6",
    },
  },
  {
    path: "/orders",
    name: "OrderPage",
    component: OrderPage,
    props: {
      restaurantId: "62bdc614ae62ea3f28d00bd6",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;