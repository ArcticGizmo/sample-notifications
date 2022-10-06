import { applicationDefault, initializeApp } from 'firebase-admin/app';
import type { App, AppOptions } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import * as fs from 'fs';
import type { Messaging, MessagingPayload, MessagingOptions, Message } from 'firebase-admin/messaging';

const REGISTRATION_FILE = './registration.json';

const CONFIG: AppOptions = {
  credential: applicationDefault(),
  projectId: process.env['FIREBASE_PROJECT_ID']
};

class FirebaseNotifications {
  _app: App;
  _messaging: Messaging;
  _lookup: { [key: string]: string } = {};
  constructor() {
    this._app = initializeApp(CONFIG);
    this._messaging = getMessaging(this._app);
    this.loadRegistration();
  }

  private saveRegistration() {
    const string = JSON.stringify(this._lookup);
    fs.writeFileSync(REGISTRATION_FILE, string);
  }

  private loadRegistration() {
    if (!fs.existsSync(REGISTRATION_FILE)) {
      return;
    }

    try {
      const data = fs.readFileSync(REGISTRATION_FILE).toString();
      this._lookup = JSON.parse(data);
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async send(message: Message, dryRun?: boolean) {
    return this._messaging.send(message, dryRun);
  }

  async sendToDevice(alias: string, payload: MessagingPayload, opts?: MessagingOptions) {
    const token = this._lookup[alias];

    if (!token) {
      console.error(`[Firebase] No alias found for '${alias}`);
      return;
    }
    return this._messaging.sendToDevice(token, payload, opts);
  }

  async sendToDevices(aliases: string[], payload: MessagingPayload, opts?: MessagingOptions) {
    return Promise.all(aliases.map(a => this.sendToDevice(a, payload, opts)));
  }

  async broadcast(topic: string, payload: MessagingPayload, opts?: MessagingOptions) {
    const data = (payload.data = payload.data || {});
    payload.data = { ...data, $topic: topic };
    return this._messaging.sendToTopic(topic, payload, opts);
  }

  async subscribe(alias: string, topic: string) {
    const token = this._lookup[alias];

    if (!token) {
      console.error(`[Firebase] No alias found for '${alias}'`);
      return;
    }
    return this._messaging.subscribeToTopic(token, topic);
  }

  async unsubscribe(alias: string, topic: string) {
    const token = this._lookup[alias];

    if (!token) {
      console.error(`[Firebase] No alias found for '${alias}'`);
      return;
    }
    return this._messaging.unsubscribeFromTopic(token, topic);
  }

  register(alias: string, key: string) {
    this._lookup[alias] = key;
    this.saveRegistration();
  }

  unregister(alias: string) {
    delete this._lookup[alias];
    this.saveRegistration();
  }

  getAliases() {
    return Object.keys(this._lookup);
  }

  aliasToKey(alias: string): string | undefined {
    return this._lookup[alias];
  }
}

export const Firebase = new FirebaseNotifications();
