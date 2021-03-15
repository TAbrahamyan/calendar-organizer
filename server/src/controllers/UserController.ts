import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import crypto from 'crypto';
import { config, sendEmail } from '../config';
import User, { IUser } from '../models/User';
import Task from '../models/Task';

class UserController {
  static async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { fullName, email, password } = req.body;
      const candidate: IUser = await User.findOne({ email });
      if (candidate) {
        return res.status(500).json({ msg: `Email ${email} already exists` });
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);
      const emailToken = crypto.randomBytes(64).toString('hex');
      const newUser: IUser = new User({
        fullName, email, emailToken, password: hashedPassword, isVerified: false,
      });

      await newUser.save();

      await sendEmail({
        to: email,
        subject: 'Calendar Organizer - email verifying',
        html: `
          <h1>Hello ${fullName}✔</h1>
          <h3>To continue using Calendar Organizer for your goals you need to verify your account.</h3>
          <p>Just click the verify link on the below.</p>
          <a href="${req.headers.origin}/verify-email=${newUser.emailToken}">VERIFY</a>
        `,
      });

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

      if (user.isVerified === false) {
        return res.status(400).json({ msg: 'Account need verification. Check spam if not received' });
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

  static async verifyEmail(req, res) {
    try {
      await User.findOneAndUpdate(
        { emailToken: req.params.token },
        { $set: { emailToken: null, isVerified: true } },
        { new: true },
      );

      res.status(200).json();
    } catch {
      res.status(401).msg({ msg: 'Invalid token' });
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const user: IUser = await User.findOne({ _id: req.params.id });
      const isMatch: boolean = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Wrong old password!' });
      }

      const passwordChangedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { password: await bcrypt.hash(newPassword, 10) } },
        { new: true },
      );

      await passwordChangedUser.save();
      res.json({ msg: 'Password is succesfully changed' });
    } catch {
      res.status(500).json({ msg: 'Failed on password changing' });
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

export default UserController;
