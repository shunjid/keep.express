const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
} = require("../controllers/tasksController");

const router = express.Router();
router.route("/").post(createTask).get(getTasks);
router.route("/:id").get(getTaskById).patch(updateTask);

module.exports = router;
