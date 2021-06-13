const Task = require("../models/tasksModel");
const { success, error } = require("../utils/response");

const createTask = (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => success(res, task, 201))
    .catch((e) => error(res, e.message, 501));
};

const getTasks = (req, res) => {
  Task.find({})
    .then((tasks) => success(res, tasks, 200))
    .catch((e) => error(res, e.message, 500));
};

const getTaskById = (req, res) => {
  const { id: _id } = req.params;

  Task.findById(_id)
    .then((task) => {
      if (!task) error(res, "Task not found", 404);
      else success(res, task, 200);
    })
    .catch((e) => error(res, e.message, 500));
};

module.exports = { createTask, getTasks, getTaskById };
