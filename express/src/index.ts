import dotenv from 'dotenv';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';

const ENVS = ['.env.local', '.env'];
ENVS.forEach(path => dotenv.config({ path }));

const PORT = process.env.PORT || 3000;

import { mobileRouter } from './routes/mobile';
import { firebaseRouter } from './routes/firebase';
import { courierRouter } from './routes/courier';
import { magicbellRouter } from './routes/magicbell';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/mobile', mobileRouter);
app.use('/firebase', firebaseRouter);
app.use('/courier', courierRouter);
app.use('/magicbell', magicbellRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
