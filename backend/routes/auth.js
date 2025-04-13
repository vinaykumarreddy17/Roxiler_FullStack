const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const { User } = require("../models");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name")
      .isLength({ min: 20, max: 60 })
      .withMessage("Name must be between 20 and 60 characters."),
    body("email")
      .isEmail()
      .withMessage("Invalid email address."),
    body("password")
      .isLength({ min: 8, max: 16 })
      .withMessage("Password must be between 8 and 16 characters."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, address } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
      });
      res.status(201).json({
        message: "User created successfully",
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ error: "Email already exists." });
      } else {
        res.status(500).json({ error: "An error occurred while creating the user." });
      }
    }
  }
);

module.exports = router;