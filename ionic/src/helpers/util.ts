import { isPlatform, toastController } from '@ionic/vue';

export const isNative = isPlatform('hybrid');

export const deviceAlias = isNative ? 'native' : 'web';

export const toast = async (message: string) => {
  const t = await toastController.create({ message, duration: 2000 });
  await t.present();
};
