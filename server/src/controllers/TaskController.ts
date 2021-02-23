import Task from '../models/Task';

export class TaskController {
  static async create(req, res) {
    try {
      const { title, description, createdDay, completed } = req.body;
      const newTask = new Task({ title, description, completed, taskCreatedDay: createdDay, owner: req.userId });
      await newTask.save();
      res.status(201).json({ newTask });
    } catch {
      res.status(400).json({ msg: 'Error on creating' });
    }
  }

  static async getAll(req, res) {
    try {
      const tasks = await Task.find({ owner: req.userId });
      res.json({ tasks });
    } catch {
      res.status(500).json({ msg: 'Failed to receive tasks' });
    }
  }

  static async edit(req, res) {
    try {
      const { newTitle, newDescription } = req.body;

      const editedTask = await Task.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { title: newTitle, description: newDescription } },
        { new: true },
      );

      res.json({ msg: editedTask });
    } catch {
      res.status(400).json({ msg: 'Error on task editing' });
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
}
