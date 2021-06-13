const User = require("../models/usersModel");
const { attributeValidator } = require("../utils/validator");
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
    const user = await User.findById(_id);

    if (!user) error(res, "User not found", 404);
    else success(res, user, 200);
  } catch (e) {
    error(res, e.message, 500);
  }
};

const updateUserById = async (req, res) => {
  const { id: _id } = req.params;
  const body = req.body;
  const options = {
    new: true,
    runValidators: true,
  };

  const isValidModel = await attributeValidator({
    requested: Object.keys(body),
    allowed: ["name", "email", "age", "password"],
  });

  if (isValidModel) {
    try {
      const user = await User.findByIdAndUpdate(_id, body, options);

      if (!user) error(res, "User not found", 404);
      else success(res, user, 200);
    } catch (e) {
      error(res, e.message, 500);
    }
  } else {
    error(res, "Invalid updates", 400);
  }
};

module.exports = { signUp, getUsers, getUserById, updateUserById };
