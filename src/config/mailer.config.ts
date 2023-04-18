import { MailerOptions } from '@nestjs-modules/mailer';
require('dotenv-flow').config()

export const mailerConfig: MailerOptions = {
  transport: {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ID, // generated ethereal user
      pass: process.env.EMAIL_PASS // generated ethereal password
    },
  },
};