import nodemailer from 'nodemailer';
import { config } from './';

export default async (emailBody): Promise<void> => {
  await nodemailer
    .createTransport({
      service: config.email.service,
      auth: {
        user: config.email.username,
        pass: config.email.password,
      },
    })
    .sendMail(emailBody);
};
