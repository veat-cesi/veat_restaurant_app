<template>
  <ion-page>

    <sidebar-menu :menu="menu" />

    <ion-content :fullscreen="true">
      <div id="container">
        <form id="restaurant">
          <div class="form__group field">
            <input type="text" class="form__field" placeholder="Nom du Restaurant" name="name" id='name' v-model="restaurant.name" required />
            <label for="name" class="form__label">Nom du Restaurant</label>
          </div>
          <div class="form__group field">
            <input type="email" class="form__field" placeholder="Email" name="email" id='email' v-model="restaurant.email" required />
            <label for="email" class="form__label">Email</label>
          </div>
          <div class="form__group field">
            <input type="tel" class="form__field" placeholder="Téléphone" name="phone" id='phone' v-model="restaurant.phone" required />
            <label for="phone" class="form__label">Téléphone</label>
          </div>
          <div class="form__group field">
            <input type="text" class="form__field" placeholder="Ville" name="city" id='city' v-model="restaurant.city" required />
            <label for="city" class="form__label">Ville</label>
          </div>
          <div class="form__group field">
            <input type="text" class="form__field" placeholder="Adresse" name="address" id='address' v-model="restaurant.address" required />
            <label for="address" class="form__label">Adresse</label>
          </div>
          <div class="form__group field">
            Image :
            <input type="file" id="img" @change="toDataUrl">
          </div>
          <input type="button" @click="submit" value="Enregistrer">
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, toastController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import axios from 'axios';


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
          href: '/commands',
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
  methods:{
    getRestaurant: async function(){
      const response = await axios.get("http://localhost:3000/getRestaurantById/"+this.id)
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
      const response = await axios.post("http://localhost:3000/updateRestaurant",{
        restaurantId: this.restaurant.id,
        restaurant: this.restaurant
      });
      this.openToast()
    },
    toDataUrl: function(img: any){
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

      if(dataURL){
        this.restaurant.img = dataURL;
        console.log(this.restaurant.img)
      }
    },
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
