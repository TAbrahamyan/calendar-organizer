import mongoose from 'mongoose';
import { config } from './';

mongoose.connect(config.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Database is connected'))
  .catch(err => console.error('Error in connecting', err));
