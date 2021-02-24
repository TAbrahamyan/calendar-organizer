import Task, { ITask } from '../models/Task';

export class TaskController {
  static async create(req, res) {
    try {
      const { title, description, createdDay } = req.body;
      const newTask: ITask = new Task({ title, description, createdDay, completed: false, owner: req.userId });
      await newTask.save();
      res.status(201).json({ msg: 'Task succesfuly created' });
    } catch {
      res.status(400).json({ msg: 'Error on creating' });
    }
  }

  static async getAll(req, res) {
    try {
      const tasks: ITask[] = await Task.find({ owner: req.userId });
      res.json({ tasks });
    } catch {
      res.status(500).json({ msg: 'Failed to receive tasks' });
    }
  }

  static async delete(req, res) {
    try {
      await Task.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: 'Task succesfully deleted' });
    } catch {
      res.status(400).json({ msg: 'Error on task deleting' });
    }
  }

  static async edit(req, res) {
    try {
      await Task.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { title: req.body.newTitle, description: req.body.newDescription } },
        { new: true },
      );

      res.json({ msg: 'Task succesfully edited' });
    } catch {
      res.status(400).json({ msg: 'Error on task editing' });
    }
  }

  static async complete(req, res) {
    try {
      await Task.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { completed: !req.body.completed } },
        { new: true },
      );

      res.json({ msg: 'Task succesfully completed' });
    } catch {
      res.status(400).json({ msg: 'Task completing is failed' });
    }
  }
}
