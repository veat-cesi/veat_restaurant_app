<template>
  <ion-modal class="modal-wrapper">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="setOpen(false)">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <ion-img :src="mealInfo.img"></ion-img>
      <ion-row>
        <ion-col class="light-bg ion-padding-start">
          <ion-text color="dark">
            <div class="form__group field">
              <input id='category' v-model="mealInfo.name" class="form__field" name="category" placeholder="Nom du Restaurant"
                     required type="text"/>
              <ion-label class="form__label" for="category">Nom du plat</ion-label>
            </div>
          </ion-text>
        </ion-col>
        <ion-col class="light-bg ion-padding-start">
            <input type="file" accept="image/*" id="img" @change="toDataUrl" ref="file"/>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="light-bg ion-padding-start">
          <ion-text color="dark">
            <div class="form__group field">
              <input id='category' v-model="mealInfo.price" class="form__field" name="category" placeholder="Nom du Restaurant"
                     required type="number"/>
              <ion-label class="form__label" for="category">Prix du plat</ion-label>
            </div>
          </ion-text>
        </ion-col>
        <ion-col class="light-bg ion-padding-start">
          <ion-text color="dark">
            <div class="form__group field">
              <input id='category' v-model="mealInfo.info" class="form__field" name="category" placeholder="Nom du Restaurant"
                     required type="text"/>
              <ion-label class="form__label" for="category">Info du plat</ion-label>
            </div>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-footer class="footer" collapse="fade">
        <ion-toolbar>
          <ion-button class="bar bar-footer" @click="updateMeal(meal)">Enregistrer</ion-button>
        </ion-toolbar>
      </ion-footer>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import {IonModal, IonToolbar, IonButtons, IonButton, IonHeader, IonContent, IonImg, IonRow, IonCol, IonText, IonFooter, IonLabel} from "@ionic/vue";
import axios from "axios";
import {defineComponent} from "vue";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "meal-modal",
  components: {
    IonModal, IonToolbar, IonButtons, IonButton, IonHeader, IonContent, IonImg, IonRow, IonCol, IonText, IonFooter, IonLabel
  },
  props: ["meal"],
  data(){
    return{
      mealInfo:{
        name: null,
        price: null,
        info: null,
        img: null
      }
    }
  },
  methods: {
    setOpen(state: boolean) {
      this.$emit("openState", state)
    },
    toDataUrl: function(img: any){
      const selectedImage = img.target.files[0];
      console.log(selectedImage)
      let dataURL = null;
      const reader = new FileReader();

      reader.addEventListener("loadend", function () {
        // on convertit l'image en une chaîne de caractères base64
        dataURL = reader.result;
      }, false);

      if (selectedImage) {
        reader.readAsDataURL(selectedImage);
      }

      if(dataURL){
        this.mealInfo.img = dataURL;
      }
    },
    updateMeal: async function(meal: any){
      if (meal.img === null){
        meal.img = "https://xcite-event.fr/wp-content/plugins/radiantthemes-addons/assets/images/No-Image-Found-400x264.png"
      }
      const response = await axios.post("http://localhost:3000/updateMeal", {
        meal: this.mealInfo
      });
      this.mealInfo = response.data;
    },
  },
  mounted(){
    this.mealInfo = this.meal
  }
})
</script>

<style scoped>
.modal-wrapper {
  height: 100%;
  width: 100%;
  border-radius: 15px;
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