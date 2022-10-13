import wretch from 'wretch';

interface MessageData {
  [key: string]: string;
}

interface NotificationData {
  tag?: string;

  body?: string;

  icon?: string;

  badge?: string;

  color?: string;

  sound?: string;

  title?: string;

  bodyLocKey?: string;

  bodyLocArgs?: string;

  clickAction?: string;

  titleLocKey?: string;

  titleLocArgs?: string;
  [key: string]: string | undefined;
}

interface MessagePayload {
  data?: MessageData;
  notification?: NotificationData;
}

interface CourierPayload {
  subject: string;
  name: string;
  payload: string;
}

interface MagicBellPayload {
  title: string;
  content: string;
  payload: string;
}

class HttpService {
  _base = 'http://localhost:3000';

  private _w(endpoint: string) {
    const url = `${this._base}/${endpoint}`;
    return wretch(url);
  }

  async getAliases(): Promise<string[]> {
    return this._w('mobile/registered').get().json();
  }

  async sendFirebaseTestByToken(token: string) {
    return this._w('firebase/send-to-token').post({ token }).res();
  }

  async sendFirebasePush(alias: string, data: MessageData, notification: NotificationData) {
    return this._w('firebase').post({ alias, data, notification }).res();
  }

  async sendFirebaseBroadcast(topic: string, data: MessageData, notification: NotificationData) {
    return this._w('firebase/broadcast').post({ topic, data, notification }).res();
  }

  async sendCourierPush(alias: string, payload: CourierPayload) {
    return this._w('courier')
      .post({ ...payload, alias })
      .res();
  }

  async sendCourierEmail(email: string, payload: CourierPayload) {
    return this._w('courier/email')
      .post({ ...payload, email })
      .res();
  }

  async sendCourierInApp(userId: string, payload: CourierPayload) {
    return this._w('courier/in-app')
      .post({ ...payload, userId })
      .res();
  }

  async sendMagicBellPush(email: string, payload: MagicBellPayload) {
    return this._w('magicbell')
      .post({ ...payload, email })
      .res();
  }

  async sendMagicBellEmail(email: string, payload: MagicBellPayload) {
    return this._w('magicbell/email')
      .post({ ...payload, email })
      .res();
  }

  async sendMagicBellInApp(email: string, payload: MagicBellPayload) {
    return this._w('magicbell/in-app')
      .post({ ...payload, email })
      .res();
  }
}

export const Http = new HttpService();
