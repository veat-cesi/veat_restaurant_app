<template>
  <ion-page>

    <sidebar-menu :menu="menu"/>

    <ion-content :fullscreen="true">
      <div id="container">
        <form id="restaurant">
          <div class="form__group field">
            <input id='name' v-model="restaurant.name" class="form__field" name="name" placeholder="Nom du Restaurant"
                   required type="text"/>
            <label class="form__label" for="name">Nom du Restaurant</label>
          </div>
          <div class="form__group field">
            <input id='email' v-model="restaurant.email" class="form__field" name="email" placeholder="Email"
                   required type="email"/>
            <label class="form__label" for="email">Email</label>
          </div>
          <div class="form__group field">
            <input id='phone' v-model="restaurant.phone" class="form__field" name="phone" placeholder="Téléphone"
                   required type="tel"/>
            <label class="form__label" for="phone">Téléphone</label>
          </div>
          <div class="form__group field">
            <input id='city' v-model="restaurant.city" class="form__field" name="city" placeholder="Ville" required
                   type="text"/>
            <label class="form__label" for="city">Ville</label>
          </div>
          <div class="form__group field">
            <input id='address' v-model="restaurant.address" class="form__field" name="address" placeholder="Adresse"
                   required type="text"/>
            <label class="form__label" for="address">Adresse</label>
          </div>
          <div class="form__group field">
            Image :
            <input id="img" type="file" @change="toDataUrl">
          </div>
          <input type="button" value="Enregistrer" @click="submit">
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonContent, IonPage, toastController} from '@ionic/vue';
import {defineComponent} from 'vue';
import {SidebarMenu} from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
//import axios from 'axios';
import api from "../api/index"
import { Storage } from "@capacitor/storage"



export default defineComponent({
  name: 'RestaurantPage',
  components: {
    IonContent,
    IonPage,
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
      restaurant: {
        id: null,
        name: null,
        email: null,
        phone: null,
        city: null,
        address: null,
        img: null,
      },
      errors: [],
    }
  },
  methods: {
    checkToken: async function () {
      const token = await Storage.get({key : 'token'})
      if (!token.value){
        this.$router.push('/login')
      }      
    },
    getRestaurant: async function () {
      const response = await api.get("http://localhost:3000/getRestaurantById/" + this.id)
      this.restaurant = response.data
    },
    async openToast() {
      const toast = await toastController
          .create({
            message: 'Your settings have been saved.',
            duration: 2000
          })
      return toast.present();
    },
    submit: async function () {
      const response = await api.post("http://localhost:3000/updateRestaurant", {
        restaurantId: this.restaurant.id,
        restaurant: this.restaurant
      });
      this.openToast()
    },
    toDataUrl: function (img: any) {
      const selectedImage = img.target.files[0];
      let dataURL = null;
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        // on convertit l'image en une chaîne de caractères base64
        dataURL = reader.result;
      }, false);

      if (selectedImage) {
        reader.readAsDataURL(selectedImage);
      }

      if (dataURL) {
        this.restaurant.img = dataURL;
        console.log(this.restaurant.img)
      }
    },
  },
  ionViewWillEnter() {
    this.checkToken()
  },
  mounted() {
    this.getRestaurant()
  }
});
</script>

<style scoped>
#container {
  text-align: center;

  position: relative;
  left: 25%;
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
