import { isNative } from '@/helpers/util';
import wretch from 'wretch';

class HttpService {
  _base = isNative ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

  private _w(endpoint: string) {
    const url = `${this._base}/${endpoint}`;
    return wretch(url);
  }

  async registerFirebaseToken(alias: string, key: string) {
    return this._w('firebase/register').post({ alias, key });
  }

  async unregisterFirebaseToken(alias: string) {
    return this._w('firebase/register').post({ alias });
  }
}

export const Http = new HttpService();
