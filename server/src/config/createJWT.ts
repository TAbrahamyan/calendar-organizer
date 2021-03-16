import jwt from 'jsonwebtoken';
import { config } from './';

export default (userId: string): string => {
  return jwt.sign(
    { userId },
    config.jwtSecret,
    { expiresIn: '1h' },
  );
};
