const express = require("express");
const { createTask } = require("../controllers/tasksController");

const router = express.Router();
router.route("/").post(createTask);

module.exports = router;
