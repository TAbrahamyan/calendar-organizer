import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { config, createJWT, sendEmail } from '../config';
import User from '../models/User';
import Task from '../models/Task';

const client = new OAuth2Client(config.googleClientId);

class UserController {
  static async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { fullName, email, password } = req.body;
      const user: any = await User.findOne({ email });

      if (user && user?.googleId !== 'signed in without Google' && user?.googleId !== '') {
        return res.status(400).json({ msg: `Email ${email} already signed in with Google` });
      }

      if (user && user.facebookUserID !== 'signed in without Facebook' && user.facebookUserID !== '') {
        return res.status(400).json({ msg: `Email ${email} already signed in with Facebook` });
      }

      if (user) {
        return res.status(400).json({ msg: `Email ${email} already exists` });
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
        return res.status(400).json({ msg: `Email ${email} already signed in with Facebook` });
      }

      if (user.googleId !== 'signed in without Google' && user.googleId !== '') {
        return res.status(400).json({ msg: `Email ${email} already signed in with Google` });
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
      const { tokenId, googleId } = req.body;

      client
        .verifyIdToken({
          idToken: tokenId,
          audience: config.googleClientId,
        })
        .then(async (response: any) => {
          const { name, email, picture } = response.payload;

          try {
            const user: any = await User.findOne({ googleId });

            if (user?.googleId === 'signed in without Google') {
              return res.status(400).json({ msg: 'Sorry this Email already signed in without Google' });
            }

            if (!user) {
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
              res.json(createJWT(user._id));
            }
          } catch {
            res.status(400).json({ msg: 'Error on logging in with Google' });
          }
        });
    } catch {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  }

  static async loginWithFacebook(req, res) {
    try {
      const { name, email, userID, picture } = req.body;
      const user: any = await User.findOne({ facebookUserID: userID });

      if (user?.facebookUserID === 'signed in without Facebook') {
        return res.status(400).json({ msg: 'Sorry this Email already signed in without Facebook' });
      }

      if (!user) {
        const hashedPassword: string = await bcrypt.hash(name + email + userID, 10);
        const newUser = new User({
          fullName: name,
          email,
          emailToken: '',
          googleId: '',
          facebookUserID: userID,
          password: hashedPassword,
          isVerified: true,
          picture,
        });

        await newUser.save();
        res.json(createJWT(newUser._id));
      } else {
        res.json(createJWT(user._id));
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
      res.status(401).json({ msg: 'Invalid token' });
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

      res.json({ msg: 'Password is succesfully changed' });
    } catch {
      res.status(500).json({ msg: 'Failed on Password changing' });
    }
  }

  static async changeUserPicture(req, res) {
    try {

      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $set: { picture: req.body.newPicture } },
        { new: true },
      );

      res.json({ msg: 'Profile picture succesfully changed' });
    } catch {
      res.status(500).json({ msg: 'Failed on Picture changing' });
    }
  }

  static async destroy(req, res) {
    try {
      await User.findByIdAndRemove(req.userId);
      await Task.deleteMany({ owner: req.userId });
      res.json({ msg: 'Account is succesfully destroyed' });
    } catch {
      res.status(500).json({ msg: 'Failed on account destroying' });
    }
  }
}

export default UserController;
