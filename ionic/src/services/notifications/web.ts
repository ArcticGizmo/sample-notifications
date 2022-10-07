import { initializeApp } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';
import { BackgroundNotification, BaseNotificationClient, NotificationRef } from './base';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env['VUE_APP_FIREBASE_API_KEY'],
  authDomain: process.env['VUE_APP_FIREBASE_AUTH_DOMAIN'],
  projectId: process.env['VUE_APP_FIREBASE_PROJECT_ID'],
  storageBucket: process.env['VUE_APP_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: process.env['VUE_APP_FIREBASE_SENDER_ID'],
  appId: process.env['VUE_APP_FIREBASE_APP_ID']
};

async function getServiceWorker() {
  return navigator.serviceWorker.getRegistration(window.location.origin + '/firebase-cloud-messaging-push-scope');
}

async function getSafeServiceWorker() {
  return getServiceWorker()
    .then(sw => sw)
    .catch(e => {
      console.error('Could not get service worker');
      console.error(e);
      return undefined;
    });
}

function parseBackgroundNotification(raw: Notification, id: number): BackgroundNotification {
  return {
    id: `${id}`,
    title: raw.title,
    body: raw.body,
    tag: raw.tag,
    data: raw.data?.FCM_MSG?.data
  };
}

export class NotificationWebClient extends BaseNotificationClient {
  constructor() {
    super();
    initializeApp(firebaseConfig);
    getServiceWorker()
      .then(sw => sw?.update())
      .catch(() => undefined);
  }

  private async getBackgroundNotifications() {
    const sw = await getSafeServiceWorker();
    if (!sw) {
      return [];
    }
    return await sw.getNotifications();
  }

  async getDeliveredNotifications() {
    return this.getBackgroundNotifications().then(notifications => {
      return notifications.map(parseBackgroundNotification);
    });
  }

  async removeDeliveredNotifications(refs: NotificationRef[]) {
    const ids = refs.map(r => r.id);
    this.getBackgroundNotifications().then(notifications => {
      notifications.forEach((notification, index) => {
        if (ids.includes(`${index}`)) {
          notification.close();
        }
      });
    });
  }

  async removeAllDeliveredNotifications(): Promise<void> {
    const notifications = await this.getBackgroundNotifications();
    notifications.forEach(n => n.close());
  }
}
