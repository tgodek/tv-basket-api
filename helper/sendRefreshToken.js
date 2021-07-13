//const { Response } = require("express");
//const res = Response;

exports.sendRefreshToken = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
    expires: new Date(Date.now() + 604800000),
  });
};
