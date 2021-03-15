import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import './config/db';
import { config, createRoutes } from './config';

const app: express.Application = express();

createRoutes(app);

app.listen(config.port, () => console.log(`Server = http://localhost:${config.port}`));
