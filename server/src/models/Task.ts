import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  owner: { type: string; ref: string; };
  title: string;
  description: string;
  createdMonth: string;
  createdDay: string;
  completed: boolean;
}

const TaskSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  createdMonth: String,
  createdDay: String,
  completed: Boolean,
});

export default model<ITask>('Task', TaskSchema);
