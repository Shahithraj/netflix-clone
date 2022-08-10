const express = require('express');
const router = express.Router();

const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// REGISTER

router.post('/register', async (req, res) => {
  const user = await User.find({ email: req.body.email });
  // const userName = await User.find({ username: req.body.username });
  if (user.length > 0) {
    res.status(401).json('User already exists');
  } else {
  const userName = req.body.email.slice(0,4)
    const newUser = new User({
      username : userName,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
      isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    });
    try {
      const userDetail = await newUser.save();
      res.status(201).json(userDetail);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// Login

router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json('Wrong User');
    } else {
      // Decrypt
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (originalPassword != req.body.password) {
        res.status(401).json('Wrong Password');
      } else {
        const { password, ...restOfData } = user._doc;
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: '5d' }
        );
        res.status(500).json({ ...restOfData, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
