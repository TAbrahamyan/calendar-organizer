import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
import './src/config/db';
import { config, createRoutes } from './src/config';

const app: express.Application = express();

createRoutes(app);

if (config.isProduction) {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(config.port, () => console.log(`Server = http://localhost:${config.port}`));
