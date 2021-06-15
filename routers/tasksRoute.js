const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.use(auth);
router.route("/").post(createTask);
router.route("/").get(getTasks);

router.route("/:id").get(getTaskById);
router.route("/:id").patch(updateTask);
router.route("/:id").delete(deleteTask);

module.exports = router;
