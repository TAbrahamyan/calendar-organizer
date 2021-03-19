import jwt from 'jsonwebtoken';
import { config } from '../config';

export default (req, res, next) => {
  try {
    const token: string = req.headers.token;
    if (!token) {
      return res.status(401).json({ msg: 'Auth error' });
    }

    const decoded: any = jwt.verify(token, config.jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(500).json({ msg: 'Invalid token' });
  }
};
