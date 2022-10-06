import express, { Request, Response } from 'express';
import { register, registered, unregister } from '@/helpers/registration';
const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  await register(req);
  res.status(201).json({});
});

router.post('/unregister', async (req: Request, res: Response) => {
  await unregister(req);
  res.status(204).json({});
});

router.get('/registered', (req: Request, res: Response) => {
  res.json(registered());
});

export { router as mobileRouter };
