export default {
  isProduction: process.env.NODE_ENV,
  mongodbUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: (process.env.PORT || 8000),
} as IConfig;

interface IConfig {
  isProduction: string;
  mongodbUrl: string;
  jwtSecret: string;
  port: string | number;
}
