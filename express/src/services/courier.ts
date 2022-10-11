import { CourierClient } from '@trycourier/courier';
import type { MessageRecipient, MessageData } from '@trycourier/courier/lib/send/types';

const TEMPLATES = {
  push: process.env['COURIER_PUSH_NOTIFICATION_TEMPLATE'],
  email: process.env['COURIER_EMAIL_TEMPLATE'],
  inapp: process.env['COURIER_IN_APP_TEMPLATE']
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

  async sendEmailNotification(email: string, data: MessageData) {
    const to: MessageRecipient = { email };
    return this.send(TEMPLATES.email, to, data);
  }

  async sendPushNotification(firebaseToken: string, data: MessageData) {
    return this.send(TEMPLATES.push, { firebaseToken }, data);
  }

  async sendInAppNotification(userId: string, data: MessageData) {
    const to: MessageRecipient = {
      user_id: userId,
      courier: {
        channel: userId
      }
    };

    console.dir(to);
    return this.send(TEMPLATES.inapp, to, data);
  }
}

export const Courier = new CourierNotifications();
