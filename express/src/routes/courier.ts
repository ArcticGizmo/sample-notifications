import express, { Request, Response } from 'express';
import { Courier } from '@/services/courier';
import { Firebase } from '@/services/firebase';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const key = Firebase.aliasToKey(req.body.alias);

  if (!key) {
    res.sendStatus(404);
    return;
  }

  await Courier.sendPushNotification(key, {
    subject: req.body.subject as string,
    name: req.body.name as string,
    payload: req.body.payload as string
  });
  res.sendStatus(200);
});

router.post('/email', async (req: Request, res: Response) => {
  await Courier.sendEmailNotification(req.body.email, {
    subject: req.body.subject as string,
    name: req.body.name as string,
    payload: req.body.payload as string
  });

  res.sendStatus(200);
});

router.post('/in-app', async (req: Request, res: Response) => {
  const userId = req.body.userId;
  await Courier.sendInAppNotification(userId, {
    subject: req.body.subject as string,
    name: req.body.name as string,
    payload: req.body.payload as string
  });

  res.sendStatus(200);
});

export { router as courierRouter };
