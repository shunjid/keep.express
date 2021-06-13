const User = require("../models/usersModel");
const { success, error } = require("../utils/response");

const signUp = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => success(res, user))
    .catch((e) => error(res, e.message));
};

module.exports = { signUp };
