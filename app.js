const express = require("express");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const User = require("./models/User");
const database = require("./config/database");
const { verify } = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
} = require("./helper/createToken");
const { sendRefreshToken } = require("./helper/sendRefreshToken");

app.use(
  cors({
    origin: ["http://localhost:3001"],
  })
);

database.connection();

app.use(express.json());
app.use("/refresh_token", cookieParser());

//home route
app.get("/", (_, res) => {
  res.send("TV Basket home page");
});

app.post("/refresh_token", async (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload = null;
  try {
    payload = verify(token, process.env.RF_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }

  //token is valid
  //send back access token

  const user = await User.findOne({ _id: payload.id });
  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion != payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
