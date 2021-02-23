import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  owner: any;
  title: string;
  description: string;
  taskCreatedDay: string;
}

const TaskSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  taskCreatedDay: String,
  completed: Boolean,
}, { timestamps: true });

export default model<ITask>('Task', TaskSchema);
