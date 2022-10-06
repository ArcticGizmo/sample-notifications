import { Firebase } from '@/services/firebase';
import { Request } from 'express';

const GENERAL_TOPIC = 'general_alerts';

export const register = async (req: Request) => {
  await Firebase.register(req.body.alias, req.body.key);
  await Firebase.subscribe(req.body.alias, GENERAL_TOPIC);
  console.log(`[Firebase] Registered alias '${req.body.alias}'`);
};

export const unregister = async (req: Request) => {
  await Firebase.unregister(req.body.alias);
  await Firebase.unsubscribe(req.body.alias, GENERAL_TOPIC);
  console.log(`[Firebase] Unregistered alias '${req.body.alias}'`);
};

export const registered = () => {
  return Firebase.getAliases();
};
