const Task = require("../models/tasksModel");
const { success, error } = require("../utils/response");
const { attributeValidator } = require("../utils/validator");

const createTask = async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    success(res, task, 201);
  } catch (e) {
    error(res, e.message, 501);
  }
};

const getTasks = async (req, res) => {
  const currentUser = req.user;

  try {
    const tasks = await Task.find({
      owner: currentUser._id,
    });
    success(res, tasks, 200);
  } catch (e) {
    error(res, e.message, 500);
  }
};

const getTaskById = async (req, res) => {
  const { id: _id } = req.params;
  const currentUser = req.user;

  try {
    const task = await Task.findOne({
      _id,
      owner: currentUser._id,
    });

    if (!task) error(res, "Task not found", 404);
    else success(res, task, 200);
  } catch (e) {
    error(res, e.message, 500);
  }
};

const updateTask = async (req, res) => {
  const { id: _id } = req.params;
  const currentUser = req.user;
  const body = req.body;

  const updates = ["title", "description", "completionDate", "isCompleted"];
  const isValidModel = await attributeValidator({
    requested: Object.keys(body),
    allowed: updates,
  });

  if (isValidModel) {
    try {
      const task = await Task.findOne({ _id: _id, owner: currentUser._id });

      if (!task) error(res, "Task not found", 404);

      updates.map((update) => (task[update] = body[update] || task[update]));
      const result = await task.save();
      success(res, result, 200);
    } catch (e) {
      error(res, e.message, 400);
    }
  } else {
    error(res, "Invalid updates", 400);
  }
};

const deleteTask = async (req, res) => {
  const { id: _id } = req.params;
  const currentUser = req.user;

  try {
    const task = await Task.findOneAndDelete({
      _id: _id,
      owner: currentUser._id,
    });

    if (!task) error(res, "Task not found", 404);
    else success(res, task, 200);
  } catch (e) {
    error(res, e.message, 400);
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
