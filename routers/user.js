const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
//User Model
const User = require("../models/User");

//@route POST api/users
//@desc create user
//@access Public
router.post(
  "/add",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").not().isEmpty(),
    check("password", "password is required").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "User email already registered" }] });
      }
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, "token", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        else res.status(200).json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/users
//@desc delete user
//@access private
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await user.remove();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
