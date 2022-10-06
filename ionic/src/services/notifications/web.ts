import { initializeApp } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';
import { BaseNotificationClient } from './base';

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

export class NotificationWebClient extends BaseNotificationClient {
  constructor() {
    super();
    initializeApp(firebaseConfig);
    getServiceWorker()
      .then(sw => sw?.update())
      .catch(() => undefined);
  }

  async getDeliveredNotifications() {
    const sw = await getSafeServiceWorker();
    if (!sw) {
      return [];
    }
    return await sw.getNotifications();
  }

  async removeDeliveredNotifications() {
    // stubbed as not available
    return;
  }
}
