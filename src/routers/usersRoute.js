const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/usersController");

router.route("/").post(signUp);

module.exports = router;
