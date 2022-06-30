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
                  Liste des produits dans "{{ this.category }}"
                </strong>
              </h4>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row v-for="(meal, mealKey) in productList" :key="mealKey">
          <ion-col size="2"></ion-col>
          <ion-col v-if="meal!=null" class="border-bottom" size="4">
            <div class="form__group field">
              <h4>
                <strong>
                  <ion-text>{{ meal.name }}</ion-text>
                </strong>
              </h4>
            </div>
          </ion-col>
          <ion-col size="2" style="padding-top: 15px">
            <ion-button color="success" @click="setOpenModal(true)">Modifier le produit</ion-button>
          </ion-col>
          <ion-col size="1" style="padding-top: 15px">
            <ion-button color="danger" @click="deleteMeal(meal)">Supprimer le produit</ion-button>
          </ion-col>
          <meal-modal :is-open="isOpenModal" :meal="meal" @openState="this.isOpenModal = false"></meal-modal>
        </ion-row>
        <ion-row>
          <ion-col size="6"></ion-col>
          <ion-col style="padding-top: 15px; padding-right: 60px">
            <ion-button @click="setOpenAddModal(true)">Ajouter un produit</ion-button>
          </ion-col>
        </ion-row>
        <add-meal-modal :categoryId="this.id" :is-open="isOpenAddModal"
                        @openState="this.isOpenAddModal = false" @updateCategoryList="getProduct"></add-meal-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {useRoute} from 'vue-router'
import {IonButton, IonCol, IonContent, IonPage, IonRow, IonText} from "@ionic/vue";
import {SidebarMenu} from "vue-sidebar-menu";
import MealModal from "../components/MealModal.vue"
import AddMealModal from "@/components/AddMealModal.vue";
import axios from "axios";
import {defineComponent} from "vue";

export default defineComponent({
  name: "ProductDetailPage",
  props: ['restaurantId'],
  components: {
    IonPage,
    IonContent,
    IonRow,
    IonCol,
    IonText,
    MealModal,
    AddMealModal,
    IonButton,
    SidebarMenu,
  },
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
      productList: [],
      category: null,
      newMeal: null,
      isOpenModal: false,
      isOpenAddModal: false,
    }
  },
  methods: {
    getCategoryName: async function () {
      const response = await axios.get("http://localhost:3000/getCategoryName/" + this.id);
      this.category = response.data.category;
    },
    getProduct: async function () {
      const response = await axios.get("http://localhost:3000/getProductList/" + this.id);
      this.productList = response.data;
    },
    setOpenModal: function (state: boolean) {
      this.isOpenModal = state
    },
    setOpenAddModal: function (state: boolean) {
      this.isOpenAddModal = state
    },
    deleteMeal: async function (meal: any) {
      const response = await axios.post("http://localhost:3000/deleteMeal", {meal: meal});
      this.productList = response.data;
    },
  },
  setup() {
    const route = useRoute();
    const {id} = route.params;
    return {id};
  },
  mounted() {
    this.getCategoryName();
    this.getProduct();
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