import { CourierClient } from '@trycourier/courier';
import type { MessageRecipient, MessageData } from '@trycourier/courier/lib/send/types';

interface EmailData extends MessageData {
  subject: string;
  name: string;
  payload: string;
}

interface PushData extends MessageData {
  subject: string;
  name: string;
  payload: string;
}

const TEMPLATES = {
  push: process.env['COURIER_PUSH_NOTIFICATION_TEMPLATE'],
  email: process.env['COURIER_EMAIL_TEMPLATE']
};

const authorizationToken = process.env['COURIER_API_KEY'];

if (!authorizationToken) {
  throw 'COURIER_API_KEY env var missing';
}

const client = CourierClient({
  authorizationToken
});

class CourierNotifications {
  async send(template: string, to: MessageRecipient, data: MessageData) {
    const message = { template, to, data };
    return client.send({ message });
  }

  async sendEmailNotification(to: MessageRecipient, data: EmailData) {
    return this.send(TEMPLATES.email, to, data);
  }

  async sendPushNotification(firebaseToken: string, data: PushData) {
    return this.send(TEMPLATES.push, { firebaseToken }, data);
  }
}

export const Courier = new CourierNotifications();
