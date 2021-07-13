const { sign } = require("jsonwebtoken");

exports.createAccessToken = (user) => {
  return sign({ id: user._id }, process.env.AC_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

exports.createRefreshToken = (user) => {
  return sign(
    { id: user._id, tokenVersion: user.tokenVersion },
    process.env.RF_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
