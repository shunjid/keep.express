const Task = require("../models/tasksModel");
const { success, error } = require("../utils/response");

const createTask = (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => success(res, task))
    .catch((e) => error(res, e.message, 501));
};

module.exports = { createTask };
