import Task, { ITask } from '../models/Task';

class TaskController {
  static async create(req, res) {
    try {
      const { title, description, createdMonth, createdDay } = req.body;
      const newTask: ITask = new Task({
        title,
        description,
        createdMonth,
        createdDay,
        completed: false,
        owner: req.userId,
      });

      await newTask.save();
      res.status(201).json({ msg: 'Task successfully created' });
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
      res.json({ msg: 'Task successfully deleted' });
    } catch {
      res.status(400).json({ msg: 'Error on task deleting' });
    }
  }

  static async edit(req, res) {
    try {
      const { title, description } = req.body;

      await Task.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { title, description } },
        { new: true },
      );

      res.json({ msg: 'Task successfully edited' });
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

      res.json({ msg: 'Task successfully completed' });
    } catch {
      res.status(400).json({ msg: 'Task completing is failed' });
    }
  }
}

export default TaskController;
