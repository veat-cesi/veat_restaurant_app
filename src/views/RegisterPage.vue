<template>
  <ion-page>
    <ion-content :fullscreen="true" padding>
      <ion-grid id="container">
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>Créer un compte</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <!--<p v-if="errors.length">
                  <b>Impossible de vous inscrire : les champs suivants ne sont pas bons :</b>
                  <ul>
                    <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
                  </ul>
                </p> -->
                <ion-list class="form-group" @submit="checkForm">
                  <ion-item>
                    <ion-label position="stacked">Adresse Mail</ion-label>
                    <ion-input
                      type="text"
                      name="email"
                      id="name"
                      placeholder="example@mail.com"
                      :value="fields.email"
                      @ionInput="fields.email = $event.target.value"
                      clear-input
                      required                    
                    ></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Confirmer Adresse Mail</ion-label>
                    <ion-input
                      placeholder="example@mail.com"
                      :value="fields.email_2"
                      @ionInput="fields.email_2 = $event.target.value"
                      clear-input
                      required
                    ></ion-input>
                  </ion-item>
                  <ion-row>
                    <ion-col>
                      <ion-item>
                        <ion-label position="stacked">Prénom</ion-label>
                        <ion-input
                          placeholder="Jean"
                          :value="fields.first_name"
                          @ionInput="fields.first_name = $event.target.value"
                          clear-input
                          required
                        ></ion-input>
                      </ion-item>
                    </ion-col>
                    <ion-col>
                      <ion-item>
                        <ion-label position="stacked">Nom</ion-label>
                        <ion-input
                          placeholder="Bombeur"
                          :value="fields.last_name"
                          @ionInput="fields.last_name = $event.target.value"
                          clear-input
                          required
                        ></ion-input>
                      </ion-item>
                    </ion-col>
                  </ion-row>
                  <ion-item>
                    <ion-label position="stacked">Téléphone</ion-label>
                    <ion-input
                      placeholder="0601020304"
                      :value="fields.phone"
                      @ionInput="fields.phone = $event.target.value"    
                      clear-input
                      required
                    ></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Mot de passe</ion-label>
                    <ion-input
                      placeholder="Motdepasse1!"
                      :value="fields.password"
                      @ionInput="fields.password = $event.target.value"   
                      clear-input
                      type="password"
                      required
                    ></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Confirmation mot de passe</ion-label>
                    <ion-input
                      placeholder="Motdepasse1!"
                      :value="fields.password_2"
                      @ionInput="fields.password_2 = $event.target.value" 
                      clear-input
                      type="password"
                      required
                    ></ion-input>
                  </ion-item>
                  <ion-row>
                    <ion-col>
                      <ion-item>
                        <ion-label class="cgu-label">
                          J'ai lu et accepte les conditions générales d'utilisation
                        </ion-label>
                        <ion-button 
                          @click=cpuClick()>
                          <ion-text>CPU</ion-text>
                        </ion-button>
                        <ion-checkbox 
                          class="validation-button" 
                          color="primary"
                          @click=updateCpu()
                        ></ion-checkbox>
                      </ion-item>
                    </ion-col>
                    <ion-col>
                      <ion-item>
                        <ion-label>J'accepte de recevoir des notifications de la part de l'application Veat</ion-label>
                        <ion-checkbox
                          class="validation-button" 
                          color="primary"
                        ></ion-checkbox>
                      </ion-item>
                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col class="col-register-btn">
                      <ion-button
                        class="login-register-button"
                        @click=register()>
                        <ion-text>S'enregistrer </ion-text>
                      </ion-button>
                    </ion-col>
                    <ion-col>
                      <ion-card class="login-card">
                        <ion-card-header>
                          <ion-card-title class="login-title">Vous avez déjà un compte ?</ion-card-title>
                        </ion-card-header>
                        <ion-card-content>
                          <ion-button 
                            class="login-register-button" 
                            @click = loginClick()>
                              Se connecter
                          </ion-button>
                        </ion-card-content>
                      </ion-card>
                    </ion-col>
                  </ion-row>
                </ion-list>
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
        email: "mathieu.musard@gmail.com",
        email_2: "mathieu.musard@gmail.com",
        password: "Zelda12345!",
        password_2: "Zelda12345!",
        last_name: "Musard",
        first_name: "Mathieu",
        phone: "0629211342",
        registerError: "",
        cpu: false,
      })
      return {fields}
    },

    data(){
      return {
        logo_src: '../public/assets/img/logo.png',
        api_url: process.env.API_URL,
        formError: [],
        registerError: '',
      }
    },

    methods: {

      async openToast(error){
        const toast = await toastController.create({
          message: error,
          duration: 5000,
          position: 'top',
          color: "danger"
        })
        return toast.present()
      },

      checkForm: function (e) {
        this.errors = []

        if (!this.fields.last_name) {
          this.errors.push("Veuillez entrer votre nom.")
        }

        if (!this.fields.first_name) {
          this.errors.push("Veuillez entrer votre prénom.")
        }

        if (!this.fields.email) {
          this.errors.push("Veuillez entrer votre adresse mail.")
        } else if (!this.validEmail(this.fields.email)){
          this.error.push("Email incorrect")
        }

        if (!this.fields.email_2) {
          this.errors.push("Veuillez confirmer votre adresse mail.")
        } else if (this.fields.email != this.fields.email_2) {
          this.errors.push("Vérification de l'email incorrecte.")
        }

        if (!this.fields.phone) {
          this.errors.push("Veuillez entrer votre numéro de téléphone.")
        }

        if (!this.fields.password) {
          this.errors.push("Veuillez entrer votre mot de passe.")
        } else if (!this.validPassword(this.fields.password)) {
          this.errors.push("Mot de passe trop faible : doit contenir au moins 8 caractères donc 1 !onuscule, 1 majuscule, 1 chiffre et 1 caractère spécial.")
        }

        if (!this.fields.password_2) {
          this.errors.push("Veuillez confirmer votre mot de passe.")
        } else if (this.fields.password != this.fields.password_2) {
          this.errors.push("Vérification du mot de passe incorrect")
        }

        if (!this.fields.cpu) {
          this.errors.push("Veuillez accepter les conditions générales d'utilisation")
        } 

        if(this.errors.length) {
          return this.errors
        }
        return " "
        //e.preventDefault()

      },

      updateCpu() {
        this.fields.cpu = !this.fields.cpu
      },

      validEmail: function(email) {
        var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailRegex.test(email)
      },

      validPassword: function(password) {
        var passwrdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
        return passwrdRegex.test(password)
      },

      loginClick() {
        this.$router.push('/login')
      },

      cpuClick() {
        this.$router.push('/cpu')
      },
      
      register(){
        var erreurs = this.checkForm()
        this.formError = erreurs
        if (erreurs == " ") {
          return axios.post('http://localhost:3002/api/users/register', {
            headers: {
              'Content-Type': 'application/json',
            },
            email: this.fields.email,
            password: this.fields.password,
            phone: this.fields.phone,
            last_name: this.fields.last_name,
            first_name: this.fields.first_name
          })
          .then(response => {
            console.log(response)
            this.$router.push('/')
            return response.data
          })
          .catch(error => {
              this.registerError = error.response.data.error    
              this.openToast(this.registerError)        
          })
        } else {
          this.openToast(this.formError[0])
        }
      }

      
    }
  })
</script>

<style>

  .col-register-btn {
    vertical-align: middle;
    margin: auto;
  }

  .validation-button {
    margin-left: 25px;
  }

  .login-register-button {
    padding-left: 0%;
    padding-right: 0%;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
  }

  .login-card {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

  }

  .img_veat {
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .login-page-style {
    margin-top: auto;
    margin-bottom: auto;
  }

  #container {
  text-align: center;
  position: fixed;
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