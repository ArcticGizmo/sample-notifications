import express, { Request, Response } from 'express';
import { MagicBell } from '@/services/magicbell';
const router = express.Router();

const send = async (category: string, req: Request, res: Response) => {
  const email = req.body.email;

  if (!email) {
    res.sendStatus(404);
    return;
  }

  await MagicBell.sendToDevice(email, {
    category,
    title: req.body.title,
    content: req.body.content,
    custom_attributes: { score: '1000', other: req.body.payload }
  });

  res.sendStatus(200);
};

router.post('/', async (req: Request, res: Response) => {
  await send('push', req, res);
});

router.post('/email', async (req: Request, res: Response) => {
  await send('email', req, res);
});

router.post('/in-app', async (req: Request, res: Response) => {
  await send('in-app', req, res);
});

export { router as magicbellRouter };
