import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import './config/db';
import { createRoutes } from './config/routes';

const app: express.Application = express();
const PORT = (process.env.PORT || 8000);

createRoutes(app);
app.listen(PORT, () => console.log(`Server = http://localhost:${PORT}`));
