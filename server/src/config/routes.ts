import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { checkAuth, validations } from '../middlewares';
import { UserController } from '../controllers/UserController';
import { TaskController } from '../controllers/TaskController';

export default (app: express.Application) => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // User api
  app.post('/api/user/signup', validations.signup, UserController.signup);
  app.post('/api/user/login', validations.login, UserController.login);
  app.get('/api/user/me', checkAuth, UserController.me);

  // Task api
  app.post('/api/task/create', checkAuth, TaskController.create);
  app.get('/api/task/getAll', checkAuth, TaskController.getAll);
  app.patch('/api/task/:id', TaskController.edit);
  app.delete('/api/task/:id', TaskController.delete);
};
