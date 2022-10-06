import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.github.arcticgizmo.samplenotifications',
  appName: 'Ionic Notifications',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorCookies: {
      enabled: true
    },
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
