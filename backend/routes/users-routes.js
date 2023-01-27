const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.post(
  "/createuser",
  [
    check("firstname").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("username").not().isEmpty(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.createUser
);

router.post("/login", usersController.login);

module.exports = router;
