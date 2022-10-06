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

export class NotificationWebClient extends BaseNotificationClient {
  constructor() {
    super();
    initializeApp(firebaseConfig);
  }

  async getDeliveredNotifications() {
    // stubbed as not available
    return [];
  }

  async removeDeliveredNotifications() {
    // stubbed as not available
    return;
  }
}
