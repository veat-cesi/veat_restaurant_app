<template>
  <ion-page>

    <sidebar-menu :menu="menu"/>

    <ion-content :fullscreen="true">
      <div id="container" style="margin-left: 100px">
        <ion-row>
          <ion-col class="light-bg ion-padding-start">
            <ion-text color="dark">
              <h4>
                <strong>
                  Liste des commandes
                </strong>
              </h4>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row v-for="(order, orderKey) in orderList" :key="orderKey">
          <ion-col size="4"></ion-col>
          <ion-col size="3">
            <ion-row>
              <ion-text>Xavier Labarbe</ion-text>
            </ion-row>
            <ion-row>
              <ion-text>{{ order.id }}</ion-text>
            </ion-row>
          </ion-col>
          <ion-col size="2">
            <ion-button color="success" @click="acceptOrder(order.id)">Accepter</ion-button>
          </ion-col>
          <ion-col size="1" style="padding-right: 250px">
            <ion-button color="danger" @click="declineOrder(order.id)">Refuser</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col class="light-bg ion-padding-start">
            <ion-text color="dark">
              <h4>
                <strong>
                  Commandes en cours
                </strong>
              </h4>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row v-for="(order, orderKey) in orderAcceptedList" :key="orderKey">
          <ion-col size="4"></ion-col>
          <ion-col size="3">
            <ion-row>
              <ion-text>Xavier Labarbe</ion-text>
            </ion-row>
            <ion-row>
              <ion-text>{{ order.id }}</ion-text>
            </ion-row>
          </ion-col>
          <ion-col size="2">
            <ion-button color="success" @click="acceptOrder(order.id)">Accepter</ion-button>
          </ion-col>
          <ion-col size="1" style="padding-right: 250px">
            <ion-button color="danger">Refuser</ion-button>
          </ion-col>
        </ion-row>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonButton, IonCol, IonContent, IonPage, IonRow, IonText} from '@ionic/vue';
import {defineComponent} from 'vue';
import {SidebarMenu} from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
//import axios from "axios";
import api from "../api/index"
import {io} from "socket.io-client";
import { Storage } from "@capacitor/storage"

export default defineComponent({
  name: 'CommandPage',
  components: {
    IonContent,
    IonPage,
    IonRow, IonCol, IonText,
    IonButton,
    SidebarMenu,
  },
  props: ["restaurantId"],
  data() {
    return {
      menu: [
        {
          header: 'VEAT RESTAURANTS',
          hiddenOnCollapse: true
        },
        {
          href: '/restaurant',
          title: 'Restaurant',
          icon: 'fa fa-store',
        },
        {
          href: '/products',
          title: 'Produits',
          icon: 'fa fa-utensils',
        },
        {
          href: '/orders',
          title: 'Commandes',
          icon: 'fa fa-basket-shopping',
        },
      ],
      orderList: [],
      orderAcceptedList: [],
      socket: io('http://localhost:3010'),
    }
  },
  methods: {
    checkToken: async function () {
      const token = await Storage.get({key : 'token'})
      if (!token.value){
        this.$router.push('/login')
      }      
    },

    getOrders: async function () {
      const response = await api.get("http://localhost:3000/getOrderListByRestaurantId/" + this.restaurantId);
      this.orderList = response.data;
      this.socket.on("refreshOrders", (data: any) => {
        this.getOrders();
        this.getAcceptedOrders();
      })
    },
    getAcceptedOrders: async function () {
      const response = await api.get("http://localhost:3000/getAcceptedOrderListByRestaurantId/" + this.restaurantId);
      this.orderAcceptedList = response.data;
      console.log(response.data)
      this.socket.on("refreshOrders", (data: any) => {
        this.getOrders();
        this.getAcceptedOrders();
      })
    },
    acceptOrder: async function (orderId: string) {
      this.socket.emit('orderAcceptedByRestaurant', {orderId: orderId, restaurantId: this.restaurantId});
      this.socket.on("refreshOrders", (data: any) => {
        this.getOrders();
        this.getAcceptedOrders();
      })
    },
    declineOrder: async function (orderId: string) {
      this.socket.emit('orderDeclinedByRestaurant', {orderId: orderId, restaurantId: this.restaurantId});
      this.socket.on("refreshOrders", (data: any) => {
        this.getOrders();
        this.getAcceptedOrders();
      })
    }
  },

  ionViewWillEnter() {
    this.checkToken()
  },

  mounted() {

    this.getOrders()
    this.getAcceptedOrders();
    const interval = setInterval(() => {
      this.getOrders()
      this.getAcceptedOrders();
    }, 5000);
  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: relative;
  left: 0;
  right: 0;
  top: 35%;
  transform: translateY(-50%);
}
</style>
