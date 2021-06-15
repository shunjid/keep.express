const express = require("express");
const {
  signUp,
  getCurrentUser,
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
router.route("/me").patch(updateUserById);
router.route("/logout").post(logout);
router.route("/logoutAll").post(logoutAll);
router.route("/logoutExceptCurrent").post(logoutExceptCurrent);
module.exports = router;
