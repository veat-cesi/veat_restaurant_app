<template>
  <ion-page>

    <sidebar-menu :menu="menu" />

    <ion-content :fullscreen="true">
      <div id="container">
        <form id="restaurant" @submit="checkForm" method="post">
          <div class="form__group field">
            <input type="text" class="form__field" placeholder="Nom du Restaurant" name="name" id='name' v-model="name" required />
            <label for="name" class="form__label">Nom du Restaurant</label>
          </div>
          <div class="form__group field">
            <input type="email" class="form__field" placeholder="Email" name="email" id='email' v-model="email" required />
            <label for="email" class="form__label">Email</label>
          </div>
          <div class="form__group field">
            <input type="tel" class="form__field" placeholder="Téléphone" name="phone" id='phone' v-model="phone" required />
            <label for="phone" class="form__label">Téléphone</label>
          </div>
          <div class="form__group field">
            <input type="text" class="form__field" placeholder="Ville" name="city" id='city' v-model="city" required />
            <label for="city" class="form__label">Ville</label>
          </div>
          <div class="form__group field">
            <input type="text" class="form__field" placeholder="Adresse" name="address" id='address' v-model="address" required />
            <label for="address" class="form__label">Adresse</label>
          </div>
          <input
              type="submit"
              value="Submit"
          >
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


export default defineComponent({
  name: 'RestaurantPage',
  components: {
    IonContent,
    IonPage,
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
          href: '/dashboards',
          title: 'Dashboard',
          icon: 'fa fa-chart-line',
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
      name: null,
      email: null,
      phone: null,
      city: null,
      address: null,
      errors: [],
    }
  },
  methods:{
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.age) {
        this.errors.push('Age required.');
      }
      console.log(this.name);
      e.preventDefault();
    }
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
