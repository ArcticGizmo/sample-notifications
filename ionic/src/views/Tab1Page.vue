<template>
  <BasePage title="Tab 1">
    <ion-button @click="onRequestPermissions()">Request Permissions</ion-button>
    <ion-button @click="onCheckPermissions()">Check Permissions</ion-button>
    <br />
    <ion-button @click="onRegisterDevice()">Register Device</ion-button>
    <ion-button @click="onUnregisterDevice()">Unregister Device</ion-button>
    <br />
    <ion-button @click="onClearBackgroundNotification()">Clear Background notification</ion-button>
  </BasePage>
</template>

<script setup lang="ts">
import BasePage from './BasePage.vue';
import { IonButton } from '@ionic/vue';
import { Http } from '@/services/httpService';
import { NotificationClient } from '@/services/notifications';
import { deviceAlias, toast } from '@/helpers/util';

const onRequestPermissions = async () => {
  const resp = await NotificationClient.requestPermissions();
  await toast(`Permissions: ${resp}`);
};

const onCheckPermissions = async () => {
  const resp = await NotificationClient.checkPermissions();
  await toast(`Permissions: ${resp}`);
};

const onRegisterDevice = async () => {
  const token = await NotificationClient.getToken();
  await Http.registerFirebaseToken(deviceAlias, token);
  await toast('Registered');
};

const onUnregisterDevice = async () => {
  await Http.unregisterFirebaseToken(deviceAlias);
  await NotificationClient.deleteToken();
  await toast('Unregistered');
};

const onClearBackgroundNotification = async () => {
  const notifications = await NotificationClient.getDeliveredNotifications();
  const first = notifications[0];
  if (!first) {
    await toast('No more notifications');
    return;
  }

  await NotificationClient.removeDeliveredNotifications([first]);
  await toast(`Closed notification ${first.id} - ${first.tag || '--no tag--'}`);
};
</script>

<style></style>
