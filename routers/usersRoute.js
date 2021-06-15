const express = require("express");
const {
  signUp,
  getCurrentUser,
  getUserById,
  updateUserById,
  login,
  logout,
  logoutAll,
  logoutExceptCurrent,
} = require("../controllers/usersController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(signUp);
router.route("/login").post(login);

router.use(auth);
router.route("/me").get(getCurrentUser);
router.route("/:id").get(getUserById);
router.route("/:id").patch(updateUserById);
router.route("/logout").post(logout);
router.route("/logoutAll").post(logoutAll);
router.route("/logoutExceptCurrent").post(logoutExceptCurrent);
module.exports = router;
