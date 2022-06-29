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
      <ion-img :src="meal?.img"></ion-img>
      <ion-row>
        <ion-col class="light-bg ion-padding-start">
          <ion-text color="dark">
            <h4>
              <strong>
                {{ meal?.name }}
              </strong>
            </h4>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col class="light-bg ion-padding-start">
          <ion-text color="dark">
            <h4>
              <strong>
                {{ meal?.price }}€
              </strong>
            </h4>
          </ion-text>
        </ion-col>
      </ion-row>
      <ion-footer class="footer" collapse="fade">
        <ion-toolbar>
          <ion-button class="bar bar-footer" @click="addProduct(meal, quantity)">Enregistrer</ion-button>
        </ion-toolbar>
      </ion-footer>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import {IonModal} from "@ionic/vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "meal-modal",
  components: {
    IonModal,
  },
  props: ["meal"],
  methods: {
    setOpen(state: boolean) {
      this.$emit("openState", state)
    },
  }
})

</script>

<style scoped>
.modal-wrapper {
  height: 100%;
  width: 100%;
  border-radius: 15px;
}
</style>