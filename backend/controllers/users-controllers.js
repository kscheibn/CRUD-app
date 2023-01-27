const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const createUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Could not create user. Please check your inputs.", 422)
    );
  }

  const { firstname, lastname, username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      "Create user failed. Please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "Username taken. Please try again or login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user. Please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    firstname,
    lastname,
    username,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Could not create user. Please try again later.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, username: createdUser.username },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Create user failed. Please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({
      userId: createdUser.id,
      username: createdUser.username,
      token: token,
    });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      "Create user failed. Please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials. Could not locate user.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Failed login. Please try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid password. Please try again.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Login failed. Please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: token
  });
};

exports.createUser = createUser;
exports.login = login;
