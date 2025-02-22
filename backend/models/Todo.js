const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const todoModel = mongoose.model("Todo", TodoSchema);

module.exports = todoModel;