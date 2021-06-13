const User = require("../models/usersModel");
const { success, error } = require("../utils/response");

const signUp = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    success(res, user, 201);
  } catch (e) {
    error(res, e.message, 501);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    success(res, users, 200);
  } catch (e) {
    error(res, e.message, 500);
  }
};

const getUserById = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const user = User.findById(_id);

    if (!user) error(res, "User not found", 404);
    else success(res, user, 200);
  } catch (e) {
    error(res, e.message, 500);
  }
};

module.exports = { signUp, getUsers, getUserById };
