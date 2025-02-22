const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const connectDB = require("./db/db");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/todos", todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
