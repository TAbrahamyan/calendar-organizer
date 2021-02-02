import express from 'express';
import cors from 'cors';
import { checkAuth, validations } from '../middlewares';
import { UserController } from '../controllers/UserController';

export default (app: express.Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post('/api/user/signup', validations.signup, UserController.signup);
  app.post('/api/user/login', validations.login, UserController.login);
  app.get('/api/user/me', checkAuth, UserController.me);
};
