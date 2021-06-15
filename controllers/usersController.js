const User = require("../models/usersModel");
const { attributeValidator } = require("../utils/validator");
const { success, error } = require("../utils/response");

const signUp = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    success(res, { user, token }, 201);
  } catch (e) {
    error(res, e.message, 501);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    success(res, req.user, 200);
  } catch (e) {
    error(res, e.message, 500);
  }
};

const updateUserById = async (req, res) => {
  const user = req.user;
  const body = req.body;
  const updates = ["name", "email", "age", "password"];

  const isValidModel = await attributeValidator({
    requested: Object.keys(body),
    allowed: updates,
  });

  if (isValidModel) {
    try {
      updates.map((update) => (user[update] = body[update] || user[update]));
      const result = await user.save();
      success(res, result, 200);
    } catch (e) {
      error(res, e.message, 500);
    }
  } else {
    error(res, "Invalid updates", 400);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    success(res, { user, token }, 200);
  } catch (e) {
    error(res, e.message, 500);
  }
};

const logout = async (req, res) => {
  try {
    const currentUser = req.user;
    const currentUserToken = req.token;

    currentUser.tokens = currentUser.tokens.filter((eachTokenObject) => {
      return eachTokenObject.token !== currentUserToken;
    });

    await currentUser.save();
    success(res, "Logged out successfully");
  } catch (e) {
    error(res, "Failed to logout", 500);
  }
};

const logoutAll = async (req, res) => {
  try {
    const currentUser = req.user;
    currentUser.tokens = [];
    await currentUser.save();
    success(res, "Logged out successfully");
  } catch (e) {
    error(res, "Failed to logout", 500);
  }
};

const logoutExceptCurrent = async (req, res) => {
  try {
    const currentUser = req.user;
    const currentUserToken = req.token;

    currentUser.tokens = currentUser.tokens.filter((eachTokenObject) => {
      return eachTokenObject.token === currentUserToken;
    });

    await currentUser.save();
    success(res, "Logged out successfully");
  } catch (e) {
    error(res, "Failed to logout", 500);
  }
};

module.exports = {
  signUp,
  getCurrentUser,
  updateUserById,
  login,
  logout,
  logoutAll,
  logoutExceptCurrent,
};
