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
            <ion-button color="success" @click="sendMessage">Accepter</ion-button>
          </ion-col>
          <ion-col size="1" style="padding-right: 250px">
            <ion-button color="danger">Refuser</ion-button>
          </ion-col>
        </ion-row>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {IonButton, IonCol, IonContent, IonPage, IonRow, IonText} from '@ionic/vue';
import {defineComponent} from 'vue';
import {SidebarMenu} from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import axios from "axios";
import {io} from "socket.io-client";

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
      socket: null,
    }
  },
  methods: {
    getOrders: async function () {
      const response = await axios.get("http://localhost:3000/getOrderListByRestaurantId/" + this.restaurantId);
      this.orderList = response.data;
    },
    sendMessage: function () {
      console.log(this.socket);
      console.log("salut");
      this.socket.emit('data', {data: "data"});
    }
  },
  created() {
    this.socket = io('http://localhost:3010');
  },
  mounted() {
    this.getOrders()
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
