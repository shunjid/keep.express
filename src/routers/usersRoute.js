const express = require("express");
const {
  signUp,
  getUsers,
  getUserById,
  updateUserById,
  login,
} = require("../controllers/usersController");

const router = express.Router();
router.route("/").post(signUp).get(getUsers);
router.route("/:id").get(getUserById).patch(updateUserById);
router.route("/login").post(login);

module.exports = router;
