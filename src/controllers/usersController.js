const User = require("../models/usersModel");
const { success, error } = require("../utils/response");

const signUp = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => success(res, user, 201))
    .catch((e) => error(res, e.message, 501));
};

module.exports = { signUp };
