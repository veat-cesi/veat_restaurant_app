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
                  Liste des Catégories
                </strong>
              </h4>
            </ion-text>
          </ion-col>
        </ion-row>
        <ion-row v-for="(category, categoryKey) in products" :key="categoryKey" class="light-bg ion-padding-start">
          <ion-col size="2"></ion-col>
          <ion-col v-if="category!=null" class="border-bottom" size="4">
            <div class="form__group field">
              <input id='category' v-model="category.category" class="form__field" name="category"
                     placeholder="Nom du Restaurant"
                     required type="text"/>
              <ion-label class="form__label" for="category">Nom de la catégorie</ion-label>
            </div>
          </ion-col>
          <ion-col size="2" style="padding-top: 15px">
            <ion-button :router-link="'/products/detail/'+category.id" color="success">Voir les produits</ion-button>
          </ion-col>
          <ion-col size="2" style="padding-top: 15px">
            <ion-button color="danger" @click="deleteCategory(category)">Supprimer la catégorie</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="light-bg ion-padding-start">
          <ion-col size="2"></ion-col>
          <ion-col class="border-bottom" size="">
            <div class="form__group field">
              <input id='category' v-model="newCategory" class="form__field" name="category"
                     placeholder="Nom du Restaurant"
                     required type="text"/>
              <ion-label class="form__label" for="category">Nom de la nouvelle catégorie</ion-label>
            </div>
          </ion-col>
          <ion-col style="padding-top: 15px; padding-right: 150px">
            <ion-button @click="addCategory(newCategory)">Ajouter une nouvelle catégorie</ion-button>
          </ion-col>
        </ion-row>
        <ion-footer class="light-bg ion-padding-start">
          <ion-button @click="updateCategory">Enregistrer</ion-button>
        </ion-footer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonButton, IonCol, IonContent, IonFooter, IonLabel, IonPage, IonRow, IonText} from '@ionic/vue';
import {defineComponent} from 'vue';
import {SidebarMenu} from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import axios from "axios";
import { Storage } from "@capacitor/storage"



export default defineComponent({
  name: 'ProductPage',
  components: {
    IonContent,
    IonPage,
    IonCol,
    IonRow,
    IonLabel,
    IonButton,
    IonText,
    IonFooter,
    SidebarMenu,
  },
  props: ["id"],
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
      restaurantId: {...this.id},
      products: [
        {
          id: null,
          category: null,
          meal: [
            {
              name: null,
              price: null,
              info: null,
              img: null,
            }
          ]
        }
      ],
      newCategory: null,
    }
  },
  methods: {
    checkToken: async function () {
      const token = await Storage.get({key : 'token'})
      if (!token.value){
        this.$router.push('/login')
      }      
    },
    getProduct: async function () {
      const response = await axios.get("http://localhost:3000/getProductsByRestaurantId/" + this.id);
      this.products = response.data;
    },
    async addCategory(category: string) {
      const response = await axios.post("http://localhost:3000/addCategory", {
        restaurantId: this.id,
        category: category,
      });
      this.products = response.data;
      this.newCategory = null;

    },
    async updateCategory(category: string) {
      const response = await axios.post("http://localhost:3000/updateCategory", {
        restaurantId: this.id,
        products: this.products
      });
      this.products = response.data;
    },
    deleteCategory: async function (product: any) {
      const response = await axios.post("http://localhost:3000/deleteCategory", {product: product});
      this.products = response.data;
    },
  },
  ionViewWillEnter() {
    this.checkToken()
  },
  mounted() {
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

.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 1.3rem;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, var(--ion-color-primary));
  border-image-slice: 1;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: var(--ion-color-primary);
  font-weight: 700;
}

/* reset input */
.form__field:required, .form__field:invalid {
  box-shadow: none;
}

/* demo */
body {
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
}
</style>
