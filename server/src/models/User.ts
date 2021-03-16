import { Schema, model, Document } from 'mongoose';
import { ITask } from './Task';

export interface IUser extends Document {
  fullName: string;
  password: string;
  email: string;
  emailToken: string | null;
  googleId: string | null;
  isVerified: boolean;
  tasks: ITask;
}

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true, min: 3 },
  email: { type: String, required: true, unique: true },
  emailToken: String,
  googleId: String,
  isVerified: { type: Boolean, default: false },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
