const express = require("express");
const {
  signUp,
  getCurrentUser,
  getUserById,
  updateUserById,
  login,
} = require("../controllers/usersController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(signUp);
router.route("/login").post(login);

router.use(auth);
router.route("/me").get(getCurrentUser);
router.route("/:id").get(getUserById);
router.route("/:id").patch(updateUserById);
module.exports = router;
