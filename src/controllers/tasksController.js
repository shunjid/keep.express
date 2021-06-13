const Task = require("../models/tasksModel");
const { success, error } = require("../utils/response");

const createTask = async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    success(res, task, 201);
  } catch (e) {
    error(res, e.message, 501);
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    success(res, tasks, 200);
  } catch (e) {
    error(res, e.message, 500);
  }
};

const getTaskById = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const task = await Task.findById(_id);

    if (!task) error(res, "Task not found", 404);
    else success(res, task, 200);
  } catch (e) {
    error(res, e.message, 500);
  }
};

module.exports = { createTask, getTasks, getTaskById };
