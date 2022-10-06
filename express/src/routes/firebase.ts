import express, { Request, Response } from 'express';
import { Firebase } from '@/services/firebase';
import { register, unregister } from '@/helpers/registration';
import type { NotificationMessagePayload } from 'firebase-admin/messaging';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  console.log(`[Firebase] Pushing to ${req.body.alias}`);
  const data = (req.body.data || {}) as { [key: string]: string };
  const notification = (req.body.notification || {}) as NotificationMessagePayload;
  const payload = { data, notification };

  await Firebase.sendToDevice(req.body.alias, payload);
  res.sendStatus(200);
});

router.post('/broadcast', async (req: Request, res: Response) => {
  console.log(`[Firebase] Broadcasting on '${req.body.topic}'`);
  const data = (req.body.data || {}) as { [key: string]: string };
  const notification = (req.body.notification || {}) as NotificationMessagePayload;
  const payload = { data, notification };

  await Firebase.broadcast(req.body.topic, payload);
  res.sendStatus(200);
});

router.get('/test', async (req: Request, res: Response) => {
  const aliases = Firebase.getAliases();
  console.log(`[Firebase] sending to ${aliases}`);
  const data = { score: '1000' };
  const notification = {
    title: `Test broadcast`,
    body: 'Test body'
  };
  const payload = { data, notification };
  await Firebase.sendToDevices(aliases, payload);
  res.sendStatus(202);
});

export { router as firebaseRouter };
