import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  owner: any;
  title: string;
  description: string;
  createdDay: string;
  completed: boolean;
}

const TaskSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  createdDay: String,
  completed: Boolean,
}, { timestamps: true });

export default model<ITask>('Task', TaskSchema);
