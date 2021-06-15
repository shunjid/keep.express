const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const { error } = require("../utils/response");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "CatsAreCute");

    // find a user that has this id
    // and this token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (e) {
    error(res, "Please authenticate first", 401);
  }
};

module.exports = auth;
