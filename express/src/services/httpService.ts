import { IncomingMessage } from 'http';
import http, { RequestOptions } from 'https';
import { runInThisContext } from 'vm';

class HttpService {
  private async request(url: string, options: RequestOptions, data?: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const req = http.request(url, options, (res: IncomingMessage) => {
        const chunks: any[] = [];

        res.on('data', function (chunk) {
          chunks.push(chunk);
        });

        res.on('end', () => resolve(Buffer.concat(chunks).toString()));
      });

      req.on('error', reject);

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  async get(url: string, opts?: RequestOptions) {
    return this.request(url, {
      ...opts,
      method: 'GET'
    });
  }

  async post(url: string, data: any, opts?: RequestOptions) {
    return this.request(
      url,
      {
        ...opts,
        method: 'POST'
      },
      data
    );
  }

  async delete(url: string, opts?: RequestOptions) {
    return this.request(url, {
      ...opts,
      method: 'DELETE'
    });
  }
}

export const Http = new HttpService();
