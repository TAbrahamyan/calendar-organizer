export default {
  port: (process.env.PORT || 8000),
  isProduction: process.env.NODE_ENV,
  mongodbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  email: {
    service: process.env.EMAIL_SERVICE,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
} as IConfig;

interface IConfig {
  port: string | number;
  isProduction: string;
  mongodbUrl: string;
  jwtSecret: string;
  googleClientId: string;
  email: IEmail;
}

interface IEmail {
  service: string;
  username: string;
  password: string;
}
