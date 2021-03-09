import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import User, { IUser } from '../models/User';
import Task from '../models/Task';
import { config } from '../config';

export class UserController {
  static async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { fullName, email, password } = req.body;
      const candidate: IUser = await User.findOne({ email });
      if (candidate) {
        return res.status(500).json({ msg: 'User with same email already exists' });
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);
      const newUser: IUser = new User({ fullName, email, password: hashedPassword, isVerified: false });
      await newUser.save();
      res.status(201).json({ msg: 'Successful registration' });
    } catch {
      res.status(500).json({ msg: 'Error on creating user' });
    }
  }

  static async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user: IUser = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Incorrect password or email' });
      }

      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect password or email' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.jwtSecret,
        { expiresIn: '1h' },
      );

      res.json(token);
    } catch {
      res.status(500).json({ msg: 'Error on login' });
    }
  }

  static async me(req, res) {
    try {
      const user: IUser = await User.findById(req.userId);
      res.json(user);
    } catch {
      res.status(401).json({ msg: 'Error in geting user' });
    }
  }

  static async destroy(req, res) {
    try {
      const userId: string = req.params.id;
      await User.findByIdAndRemove(userId);
      await Task.deleteMany({ owner: userId });
      res.json({ msg: 'Account is succesfully destroyed' });
    } catch {
      res.status(500).json({ msg: 'Failed on account destroying' });
    }
  }
}
