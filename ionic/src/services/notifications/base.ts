import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import type { Notification, NotificationActionPerformedListener } from '@capacitor-firebase/messaging';
import { toastController } from '@ionic/vue';

async function notify(e: Notification) {
  console.log('Got notification', e);
  const { body, title } = e;

  const t = await toastController.create({
    // styling is provided at a global level (see src/theme/notifications.css)
    cssClass: 'notification-toast',
    header: title,
    message: body,
    duration: 3000,
    position: 'bottom'
  });

  await t.present();
}

export abstract class BaseNotificationClient {
  constructor() {
    this.onNotificationReceived(notify);
  }

  async requestPermissions() {
    const resp = await FirebaseMessaging.requestPermissions();
    return resp.receive;
  }

  async checkPermissions() {
    const resp = await FirebaseMessaging.checkPermissions();
    return resp.receive;
  }

  async getToken() {
    const vapidKey = process.env['VUE_APP_FIREBASE_VAPID_KEY'];
    const resp = await FirebaseMessaging.getToken({ vapidKey });
    return resp.token;
  }

  async deleteToken() {
    await FirebaseMessaging.deleteToken();
  }

  async getDeliveredNotifications() {
    const resp = await FirebaseMessaging.getDeliveredNotifications();
    return resp.notifications;
  }

  async removeDeliveredNotifications(notifications: Notification[]) {
    await FirebaseMessaging.removeDeliveredNotifications({ notifications });
  }

  async removeAllDeliveredNotifications(): Promise<void> {
    await FirebaseMessaging.removeAllDeliveredNotifications();
  }

  async onTokenReceived(callback: (token: string) => void): Promise<void> {
    await FirebaseMessaging.addListener('tokenReceived', e => callback(e.token));
  }

  async onNotificationReceived(callback: (notification: Notification) => void): Promise<void> {
    await FirebaseMessaging.addListener('notificationReceived', e => callback(e.notification));
  }

  async onNotificationActionPerformed(callback: NotificationActionPerformedListener) {
    await FirebaseMessaging.addListener('notificationActionPerformed', callback);
  }

  async removeAllListeners() {
    await FirebaseMessaging.removeAllListeners();
  }
}
