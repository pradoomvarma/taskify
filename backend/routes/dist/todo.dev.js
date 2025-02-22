"use strict";

//  start writing your code from here
var express = require("express");

var authMiddleware = require("../middleware/authMiddleware");

var todoModel = require("../models/Todo");

var todoRouter = express.Router(); // Fetch all todos for the logged-in user

todoRouter.get("/fetchAll", authMiddleware, function _callee(req, res) {
  var todos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(todoModel.find({
            user: req.user.id
          }));

        case 3:
          todos = _context.sent;
          res.json(todos);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: "Failed to fetch todos",
            error: _context.t0
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Add a new todo

todoRouter.post("/add", authMiddleware, function _callee2(req, res) {
  var text, newTodo;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          text = req.body.text;
          _context2.prev = 1;
          newTodo = new todoModel({
            user: req.user.id,
            text: text
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(newTodo.save());

        case 5:
          res.status(201).json(newTodo);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: "Failed to add todo",
            error: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Toggle todo completion

todoRouter.patch("/update/:id", authMiddleware, function _callee3(req, res) {
  var completed, todo;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          completed = req.body.completed;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(todoModel.findById(req.params.id));

        case 4:
          todo = _context3.sent;

          if (!(!todo || todo.user.toString() !== req.user.id)) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Todo not found"
          }));

        case 7:
          todo.completed = completed;
          _context3.next = 10;
          return regeneratorRuntime.awrap(todo.save());

        case 10:
          res.json(todo);
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            message: "Failed to update todo",
            error: _context3.t0
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 13]]);
}); // Delete a todo

todoRouter["delete"]("/delete/:id", authMiddleware, function _callee4(req, res) {
  var todo;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(todoModel.findById(req.params.id));

        case 3:
          todo = _context4.sent;

          if (!(!todo || todo.user.toString() !== req.user.id)) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Todo not found"
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(todo.deleteOne());

        case 8:
          res.json({
            message: "Todo deleted successfully"
          });
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: "Failed to delete todo",
            error: _context4.t0
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
module.exports = todoRouter;