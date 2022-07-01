<template>
  <ion-page>
    <ion-content :fullscreen="true" padding>
      <ion-grid id="container">
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>Se connecter</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item>
                    <ion-label position="stacked">Adresse Mail</ion-label>
                    <ion-input
                      placeholder="example@mail.com"
                      :value="fields.email"
                      @ionInput="fields.email = $event.target.value"
                      clear-input
                    ></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Mot de passe</ion-label>
                    <ion-input
                      placeholder="Mot de passe"
                      :value="fields.password"
                      @ionInput="fields.password = $event.target.value"
                      clear-input
                      type="password"
                    ></ion-input>
                  </ion-item>
                </ion-list>
                <ion-button
                  class="login-register-button"
                  @click=login()>
                  <ion-text>S'identifier </ion-text>
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-img class="img_veat" src='/assets/img/logo.png'></ion-img>
        <ion-row>
          <ion-col>
            <ion-card class="register-card">
              <ion-card-header>
                <ion-card-title class="login-title">Vous n'avez pas encore de compte ?</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-button 
                  class="login-register-button" @click=registerClick()>
                  <ion-text>Créer un compte</ion-text>
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, toastController } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { SidebarMenu } from 'vue-sidebar-menu'
  import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
  import axios from 'axios'
  import {ref} from 'vue'
  import {Storage} from '@capacitor/storage'



  export default defineComponent({
    name: 'LoginPage',
    component: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      SidebarMenu,
    },

    setup() {
      const fields = ref({
        email:'',
        password:'',
      })
      return {fields}
    },

    data(){
      return {
        logo_src: '../public/assets/img/logo.png',
        api_url: process.env.API_URL,
        loginError: ''
      }
    },

    

    methods: {

      async openToast(error) {
        const toast = await toastController.create({
          message: error,
          duration: 2000,
          position: 'top',
          color: "danger"
        })
        return toast.present()
      },

      registerClick() {
        this.$router.push('/register')
      },

      async login(){
        return axios.post('http://localhost:3002/api/users/login', {
          headers: {
            'Content-Type': 'application/json',
          },
          email: this.fields.email,
          password: this.fields.password
        })
        .then(response => {
          console.log(response.data.token)
          if (response.data.token) {
            Storage.set({key: 'token', value: response.data.token})
            this.$router.push('/')
          }
          return response.data
        })
        .catch(error => {
          this.loginError = error.response.data.error
          this.openToast(this.loginError)
        })
      }
    }
  })
</script>

<style>
  .login-register-button {
    padding-left: 0%;
    padding-right: 0%;
    margin-left: auto;
    margin-right: auto;
  }

  .register-card {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .img_veat {
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .divider {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    color: white;
    margin-bottom: 3%;
  }

  .login-page-style {
    margin-top: auto;
    margin-bottom: auto;
  }

  #container {
  text-align: center;
  position:fixed;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>