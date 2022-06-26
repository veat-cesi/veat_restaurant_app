<template>
  <ion-page>

    <sidebar-menu :menu="menu" />

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'


export default defineComponent({
  name: 'DashboardPage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
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
      ]
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
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
