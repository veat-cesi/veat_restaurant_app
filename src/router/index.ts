import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import ProductPage from "../views/ProductPage.vue";
import OrderPage from "../views/OrderPage.vue";
import RestaurantPage from "../views/RestaurantPage.vue";
import ProductDetailPage from "../views/ProductDetailPage.vue";

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
      id: "62bd7373c12cd4ee11bd7986",
    },
  },
  {
    path: "/products",
    name: "Products",
    component: ProductPage,
    props: {
      id: "62bd7373c12cd4ee11bd7986",
    },
  },
  {
    path: "/products/detail/:id",
    name: "ProductDetail",
    component: ProductDetailPage,
    props: {
      restaurantId: "62bd7373c12cd4ee11bd7986",
    },
  },
  {
    path: "/orders",
    name: "OrderPage",
    component: OrderPage,
    props: {
      restaurantId: "62bd7373c12cd4ee11bd7986",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
