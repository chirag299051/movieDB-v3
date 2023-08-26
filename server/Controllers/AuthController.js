const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({
      email,
      password,
      username,
      createdAt,
      watchlist: [],
    });
    const token = createSecretToken(user._id);
    res.status(200).json({
      user: {
        email: user.email,
        token: token,
        username: user.username,
        watchlist: user.watchlist,
        createdAt: user.createdAt,
        _id: user._id,
      },
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.status(200).json({
      user: {
        email: user.email,
        token: token,
        username: user.username,
        watchlist: user.watchlist,
        createdAt: user.createdAt,
        _id: user._id,
      },
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.logout = async (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};
