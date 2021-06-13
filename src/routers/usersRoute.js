const express = require("express");
const {
  signUp,
  getUsers,
  getUserById,
  updateUserById,
} = require("../controllers/usersController");

const router = express.Router();
router.route("/").post(signUp).get(getUsers);
router.route("/:id").get(getUserById).patch(updateUserById);

module.exports = router;
