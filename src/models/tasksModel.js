const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 120,
  },
  completionDate: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;