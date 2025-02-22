"use strict";

//  start writing from here
var jwt = require("jsonwebtoken");

var authMiddleware = function authMiddleware(req, res, next) {
  var token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No token provided."
    });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;