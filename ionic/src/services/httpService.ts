import { isNative } from '@/helpers/util';
import wretch from 'wretch';

class HttpService {
  _base = isNative ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

  private _w(endpoint: string) {
    const url = `${this._base}/${endpoint}`;
    return wretch(url);
  }

  async registerFirebaseToken(alias: string, key: string) {
    const platform = isNative ? 'android' : 'safari';
    return this._w('mobile/register').post({ alias, key, platform });
  }

  async unregisterFirebaseToken(alias: string) {
    return this._w('mobile/unregister').post({ alias });
  }
}

export const Http = new HttpService();
