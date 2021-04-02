import { Schema, model, Document } from 'mongoose';
import { ITask } from './Task';

export interface IUser extends Document {
  fullName: string;
  password: string;
  email: string;
  emailToken: string;
  googleId: string;
  facebookUserID: string;
  isVerified: boolean;
  picture: string;
  tasks: ITask;
}

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true, min: 3 },
  email: { type: String, required: true },
  emailToken: String,
  googleId: String,
  facebookUserID: String,
  isVerified: Boolean,
  picture: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
