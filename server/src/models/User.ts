import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isVerified: boolean;
}

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 3 },
  isVerified: Boolean,
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
