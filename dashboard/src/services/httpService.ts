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

class HttpService {
  _base = 'http://localhost:3000';

  private _w(endpoint: string) {
    const url = `${this._base}/${endpoint}`;
    return wretch(url);
  }

  async getAliases(): Promise<string[]> {
    return this._w('mobile/registered').get().json();
  }

  async sendFirebasePush(alias: string, data: MessageData, notification: NotificationData) {
    return this._w('firebase').post({ alias, data, notification });
  }

  async sendFirebaseBroadcast(topic: string, data: MessageData, notification: NotificationData) {
    return this._w('firebase/broadcast').post({ topic, data, notification });
  }
}

export const Http = new HttpService();
