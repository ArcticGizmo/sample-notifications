import { Firebase } from '@/services/firebase';
import { MagicBell } from '@/services/magicbell';
import { Request } from 'express';

const GENERAL_TOPIC = 'general_alerts';

export const register = async (req: Request) => {
  await Firebase.register(req.body.alias, req.body.key);
  await Firebase.subscribe(req.body.alias, GENERAL_TOPIC);
  await MagicBell.register(req.body.key, req.body.platform || 'android');
};

export const unregister = async (req: Request) => {
  const key = Firebase.aliasToKey(req.body.alias);

  await Firebase.unregister(req.body.alias);
  await Firebase.unsubscribe(req.body.alias, GENERAL_TOPIC);
  await MagicBell.unregister(key);
};

export const registered = () => {
  return Firebase.getAliases();
};
