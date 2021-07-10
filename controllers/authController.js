const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports.register_post = async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });
    const checkUsername = await User.findOne({ username: req.body.username });

    if (checkEmail) {
      return res.status(400).send("User already exists");
    }

    if (checkUsername) {
      return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    user.save(function (error, result) {
      if (error) {
        if (error.errors["name"]) {
          return res.status(400).send(error.errors["name"].message);
        }
        if (error.errors["surname"]) {
          return res.status(400).send(error.errors["surname"].message);
        }
        if (error.errors["username"]) {
          return res.status(400).send(error.errors["username"].message);
        }
        if (error.errors["email"]) {
          return res.status(400).send(error.errors["email"].message);
        }
        if (error.errors["password"]) {
          return res.status(400).send(error.errors["password"].message);
        }
      }
      if (result) {
        return res.status(201).send("Registration Successful");
      }
    });
  } catch (e) {
    res.send(e);
  }
};

module.exports.login_post = async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    var data = null;

    if (email) {
      data = {
        email: email,
      };
    } else if (username) {
      data = {
        username: username,
      };
    }

    if (data) {
      const check = await User.findOne(data);
      if (check) {
        const validPass = await bcrypt.compare(
          req.body.password,
          check.password
        );
        if (!validPass) return res.status(400).send("No matches");

        //create token
        const token = jwt.sign({ _id: check._id }, process.env.TOKEN_SECRET);
        return res.header("auth-token", token).status(200).send("Logged in");
      }
      return res.status(400).send("No matches");
    }

    res.status(400).send("No matches");
  } catch (e) {
    res.send(e);
  }
};
