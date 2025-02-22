"use strict";

var express = require("express");

var dotenv = require("dotenv");

var cors = require("cors");

var userRouter = require("./routes/user");

var todoRouter = require("./routes/todo");

var connectDB = require("./db/db");

dotenv.config();
connectDB();
var app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/todos", todoRouter);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  return console.log("\uD83D\uDE80 Server running on port ".concat(PORT));
});