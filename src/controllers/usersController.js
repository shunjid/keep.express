const User = require("../models/usersModel");
const { success, error } = require("../utils/response");

const signUp = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => success(res, user, 201))
    .catch((e) => error(res, e.message, 501));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => success(res, users, 200))
    .catch((e) => error(res, e.message, 500));
};

const getUserById = (req, res) => {
  const { id: _id } = req.params;

  User.findById(_id)
    .then((user) => {
      if (!user) error(res, "User not found", 404);
      else success(res, user, 200);
    })
    .catch((e) => error(res, e.message, 500));
};

module.exports = { signUp, getUsers, getUserById };
