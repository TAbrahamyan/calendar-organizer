import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { validationResult } from 'express-validator';
import { createJWT, sendEmail } from '../config';
import User from '../models/User';
import Task from '../models/Task';

class UserController {
  static async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { fullName, email, password } = req.body;
      const user: any = await User.findOne({ email });

      if (user) {
        if (user.googleId === 'signed in without Google' || user.facebookUserID === 'signed in without Facebook') {
          return res.status(400).json({ msg: 'This Email already exists' });
        }

        if (user.googleId !== 'signed in without Google' && user.googleId !== '') {
          return res.status(400).json({ msg: 'This Email already signed in with Google' });
        }

        if (user.facebookUserID !== 'signed in without Facebook' && user.facebookUserID !== '') {
          return res.status(400).json({ msg: 'This Email already signed in with Facebook' });
        }
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);
      const emailToken: string = crypto.randomBytes(64).toString('hex');
      const newUser = new User({
        fullName,
        email,
        emailToken,
        googleId: 'signed in without Google',
        facebookUserID: 'signed in without Facebook',
        password: hashedPassword,
        isVerified: false,
        picture: '',
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
      const user: any = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Incorrect Password or Email' });
      }

      if (user.facebookUserID !== 'signed in without Facebook' && user.facebookUserID !== '') {
        return res.status(400).json({ msg: 'This Email already signed in with Facebook' });
      }

      if (user.googleId !== 'signed in without Google' && user.googleId !== '') {
        return res.status(400).json({ msg: 'This Email already signed in with Google' });
      }

      const isMatch: boolean = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect Password or Email' });
      }

      if (!user.isVerified) {
        return res.status(400).json({ msg: 'Account need verification. Check spam if not received' });
      }

      res.json(createJWT(user._id));
    } catch {
      res.status(500).json({ msg: 'Error on login' });
    }
  }

  static async loginWithGoogle(req, res) {
    try {
      const { name, email, googleId, picture } = req.body;
      const findedUserByEmail: any = await User.findOne({ email });

      if (findedUserByEmail && findedUserByEmail.googleId === 'signed in without Google') {
        return res.status(400).json({ msg: 'This Email already signed in without Google' });
      }

      const findedUserByGoogleId: any = await User.findOne({ googleId });

      if (!findedUserByGoogleId) {
        const hashedPassword: string = await bcrypt.hash(name + email + googleId, 10);
        const newUser = new User({
          fullName: name,
          email,
          emailToken: '',
          googleId,
          facebookUserID: '',
          password: hashedPassword,
          isVerified: true,
          picture,
        });

        await newUser.save();
        res.json(createJWT(newUser._id));
      } else {
        res.json(createJWT(findedUserByGoogleId._id));
      }
    } catch {
      res.status(400).json({ msg: 'Error on logging in with Google' });
    }
  }

  static async loginWithFacebook(req, res) {
    try {
      const { name, email, facebookUserID, picture } = req.body;
      const findedUserByEmail: any = await User.findOne({ email });

      if (findedUserByEmail && findedUserByEmail.facebookUserID === 'signed in without Facebook') {
        return res.status(400).json({ msg: 'This Email already signed in without Facebook' });
      }

      const findedUserByFacebookUserID: any = await User.findOne({ facebookUserID });

      if (!findedUserByFacebookUserID) {
        const hashedPassword: string = await bcrypt.hash(name + email + facebookUserID, 10);
        const newUser = new User({
          fullName: name,
          email,
          emailToken: '',
          googleId: '',
          facebookUserID,
          password: hashedPassword,
          isVerified: true,
          picture,
        });

        await newUser.save();
        res.json(createJWT(newUser._id));
      } else {
        res.json(createJWT(findedUserByFacebookUserID._id));
      }
    } catch {
      res.status(400).json({ msg: 'Error on logging in with Facebook' });
    }
  }

  static async me(req, res) {
    try {
      const user = await User.findById(req.userId);
      res.json(user);
    } catch {
      res.status(401).json({ msg: 'Error in geting user' });
    }
  }

  static async verifyEmail(req, res) {
    try {
      await User.findOneAndUpdate(
        { emailToken: req.params.token },
        { $set: { emailToken: '', isVerified: true } },
        { new: true },
      );

      res.status(200).json();
    } catch {
      res.status(500).json({ msg: 'Invalid token' });
    }
  }

  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const user: any = await User.findOne({ _id: req.userId });
      const isMatch: boolean = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Wrong old Password' });
      }

      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $set: { password: await bcrypt.hash(newPassword, 10) } },
        { new: true },
      );

      res.json({ msg: 'Password is successfully changed' });
    } catch {
      res.status(500).json({ msg: 'Failed on Password changing' });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Sorry this email does not registered' });
      }

      if (user.facebookUserID !== 'signed in without Facebook' && user.facebookUserID !== '') {
        return res.status(400).json({ msg: `Sorry this email signed in with Facebook` });
      }

      if (user.googleId !== 'signed in without Google' && user.googleId !== '') {
        return res.status(400).json({ msg: `Sorry this email signed in with Google` });
      }

      const randomPassword: string = Math.random().toString(20).substr(2, 8);
      const newPassword: string = await bcrypt.hash(randomPassword, 10);

      await sendEmail({
        to: email,
        subject: 'Calendar Organizer - password is reseted',
        html: `<p>Your new password is: <b>${randomPassword}</b></p>`,
      });

      await User.findOneAndUpdate(
        { email },
        { $set: { password: newPassword } },
        { new: true },
      );

      res.json({ msg: 'Password successfully reseted. Check your email' });
    } catch {
      res.status(500).json({ msg: 'Failed on Password reseting' });
    }
  }

  static async changeUserPicture(req, res) {
    try {

      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $set: { picture: req.body.picture } },
        { new: true },
      );

      res.json({ msg: 'Profile picture successfully changed' });
    } catch {
      res.status(500).json({ msg: 'Failed on Picture changing' });
    }
  }

  static async deleteUserPicture(req, res) {
    try {
      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $set: { picture: '' } },
        { new: true },
      );

      res.json({ msg: 'Picture successfully deleted' });
    } catch {
      res.status(500).json({ msg: 'Failed to deleting picture' });
    }
  }

  static async destroy(req, res) {
    try {
      await User.findByIdAndRemove(req.userId);
      await Task.deleteMany({ owner: req.userId });
      res.json({ msg: 'Account is successfully destroyed' });
    } catch {
      res.status(500).json({ msg: 'Failed on account destroying' });
    }
  }
}

export default UserController;
