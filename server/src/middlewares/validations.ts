import { check } from 'express-validator';

export default {
  signup: [
    check('fullName').notEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Min length is 3').isLength({ min: 3 }),
  ],
  login: [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Min length is 3').isLength({ min: 3 }),
  ],
};
