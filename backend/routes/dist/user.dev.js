"use strict";

//  start writing your code from here
var express = require("express");

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var userModel = require("../models/User");

var userRouter = express.Router(); // Signup

userRouter.post("/signup", function _callee(req, res) {
  var _req$body, username, password, existingUser, hashedPassword, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          console.log("Request body:", req.body);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(userModel.findOne({
            username: username
          }));

        case 5:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "User already exists"
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 10:
          hashedPassword = _context.sent;
          newUser = new userModel({
            username: username,
            password: hashedPassword
          });
          _context.next = 14;
          return regeneratorRuntime.awrap(newUser.save());

        case 14:
          res.status(201).json({
            message: "User created successfully"
          });
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](2);
          res.status(500).json({
            message: "Error signing up",
            error: _context.t0
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 17]]);
}); // Signin

userRouter.post("/signin", function _callee2(req, res) {
  var _req$body2, username, password, user, isMatch, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            username: username
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Invalid credentials"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Invalid credentials"
          }));

        case 12:
          token = jwt.sign({
            id: user._id
          }, process.env.JWT_SECRET, {
            expiresIn: "1h"
          });
          res.status(200).json({
            token: token,
            id: user._id
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: "Error signing in",
            error: _context2.t0
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
module.exports = userRouter;