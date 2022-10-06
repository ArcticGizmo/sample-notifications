import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import type { Notification, NotificationActionPerformedListener } from '@capacitor-firebase/messaging';
import { toast } from '@/helpers/util';

export abstract class BaseNotificationClient {
  constructor() {
    this.onNotificationReceived(e => {
      console.dir('--- got notification');
      console.dir(e);
      toast('Got notification');
    });
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
