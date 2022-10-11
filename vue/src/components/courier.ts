const ID = 'courier-script';
const VERSION = 'https://courier-components-xvdza5.s3.amazonaws.com/latest.js';

interface CourierConfig {
  clientKey: string;
  userId: string;
  initOnLoad: boolean;
  components;
}

interface CourierSDK {
  init: (config: CourierConfig) => void;
  on: (action: string, event: any) => void;
  transport: any;
  toast: any;
  inbox: any;
}

const addScript = async () => {
  const existing = document.body.querySelector(`#${ID}`);

  if (existing) {
    existing.remove();
  }

  const script = document.createElement('script');
  script.id = ID;
  script.setAttribute('src', VERSION);
  document.body.appendChild(script);
};

interface DeferredPromise<T> extends Promise<T> {
  resolve: () => void;
  reject: () => void;
}

const Deferred = <T>(callback?: (resolve: () => void, reject: () => void) => T): DeferredPromise<T> => {
  let res, rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
    if (callback) {
      callback(resolve, reject);
    }
  });

  promise.resolve = res;
  promise.reject = rej;

  return promise;
};

class CourierClient {
  private _resolveCourier = Deferred<CourierSDK>();
  private _courier!: CourierSDK;
  private _isLoaded = Deferred<void>();
  private _isReady = Deferred<void>();

  constructor() {
    window.courierAsyncInit = () => this._resolveCourier.resolve(window.courier);
    window.courierConfig = addScript();
  }

  async init(config: CourierConfig) {
    this._courier = await this._resolveCourier;
    this._isLoaded.resolve();

    await this._courier.init(config);

    this._isReady.resolve();
  }

  async isLoaded() {
    await this._isLoaded;
  }

  async isReady() {
    await this._isReady;
  }
}

export const Courier = new CourierClient();
