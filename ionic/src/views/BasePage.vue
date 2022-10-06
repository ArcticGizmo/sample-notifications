<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ props.title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="page-content">
        <slot></slot>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

const props = defineProps({
  title: String
});
</script>

<style scoped>
ion-title {
  text-align: center;
}

.page-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
