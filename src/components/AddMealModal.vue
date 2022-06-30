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

      <ion-row class="light-bg ion-padding-start">
        <ion-text color="dark">
          <h4>
            <strong>
              Nouveau produit
            </strong>
          </h4>
        </ion-text>
      </ion-row>

      <ion-row class="light-bg ion-padding-start">
        <div class="form__group field">
          <input id='name' v-model="mealInfo.name" class="form__field" name="name" placeholder="Nom du plat"
                 required type="text"/>
          <label class="form__label" for="name">Nom du plat</label>
        </div>
      </ion-row>

      <ion-row class="light-bg ion-padding-start">
        <div class="form__group field">
          <input id='price' v-model="mealInfo.price" class="form__field" name="price" placeholder="Prix du plat"
                 required type="number"/>
          <label class="form__label" for="name">Prix du plat</label>
        </div>
      </ion-row>

      <ion-row class="light-bg ion-padding-start">
        <div class="form__group field">
          <input id='info' v-model="mealInfo.info" class="form__field" name="info" placeholder="Info du plat"
                 required type="text"/>
          <label class="form__label" for="name">Info du plat</label>
        </div>
      </ion-row>

      <ion-row class="light-bg ion-padding-start" style="padding-top: 20px">
        <div>
          <ion-text>Image :</ion-text>
          <input id='info' name="info" placeholder="Info du plat"
                 required type="file" @change="toDataUrl"/>
        </div>
      </ion-row>

      <ion-row>
        <ion-col size="6"></ion-col>
        <ion-col style="padding-top: 15px; padding-right: 60px">
          <ion-button @click="addMeal">Ajouter un produit</ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import {IonButton, IonButtons, IonCol, IonContent, IonHeader, IonModal, IonRow, IonText, IonToolbar} from "@ionic/vue";
import axios from "axios";
import {defineComponent} from "vue";

export default defineComponent({
  name: "addMeal-modal",
  components: {
    IonModal,
    IonToolbar,
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonRow, IonCol,
    IonText,
  },
  props: ["categoryId"],
  data() {
    return {
      mealInfo: {
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
    toDataUrl: function (img: any) {
      const selectedImage = img.target.files[0];
      let dataURL = null;
      const reader = new FileReader();

      reader.addEventListener("loadend", function () {
        // on convertit l'image en une chaîne de caractères base64
        dataURL = reader.result;
      }, false);

      if (selectedImage) {
        reader.readAsDataURL(selectedImage);
      }

      if (dataURL) {
        this.mealInfo.img = dataURL;
      }
    },
    addMeal: async function () {
      const response = await axios.post("http://localhost:3000/addMeal", {
        categoryId: this.categoryId,
        meal: this.mealInfo
      });
      this.$emit("updateCategoryList");
      this.setOpen(false);
    },
  },
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