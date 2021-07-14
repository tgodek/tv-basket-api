const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  createAccessToken,
  createRefreshToken,
} = require("../helper/createToken");
const { sendRefreshToken } = require("../helper/sendRefreshToken");

module.exports.all_users_get = async (_, res) => {
  const users = await User.find();
  if (users.length == 0) return res.send("No users :(");
  res.status(200).json(users);
};

module.exports.me_get = async (req, res) => {
  const me = await User.findOne({ _id: req.user });
  if (!me) return res.send("Can't find you :(");
  res.status(200).json(me);
};

module.exports.register_post = async (req, res) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.send("Body is empty");
    }

    const checkEmail = await User.findOne({ email: req.body.email });
    const checkUsername = await User.findOne({ username: req.body.username });

    if (checkEmail) {
      return res.status(409).send("User already exists");
    }

    if (checkUsername) {
      return res.status(409).send("User already exists");
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
      const user = await User.findOne(data);
      if (user) {
        const validPass = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPass) return res.status(400).send("No matches");

        sendRefreshToken(res, createRefreshToken(user));
        const token = createAccessToken(user);

        return res.status(200).send({ accessToken: token });
      }
      return res.status(400).send("No matches");
    }

    res.status(400).send("No matches");
  } catch (e) {
    res.send(e);
  }
};

module.exports.revokeRefreshTokenForUser = (req, res) => {
  const userId = req.query.id;

  User.findById(userId, function (err, doc) {
    if (err) console.log(err);
    doc.tokenVersion += 1;
    doc.save();
  });
};
