const express = require("express");
const {
  signUp,
  getUsers,
  getUserById,
} = require("../controllers/usersController");

const router = express.Router();
router.route("/").post(signUp).get(getUsers);
router.route("/:id").get(getUserById);

module.exports = router;
