"use strict";

var mongoose = require("mongoose");

var TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    "default": false
  }
});
var todoModel = mongoose.model("Todo", TodoSchema);
module.exports = todoModel;