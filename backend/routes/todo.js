//  start writing your code from here
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const todoModel = require("../models/Todo");

const todoRouter = express.Router();

// Fetch all todos for the logged-in user
todoRouter.get("/fetchAll", authMiddleware, async (req, res) => {
    try {
        const todos = await todoModel.find({ user: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch todos", error });
    }
});

// Add a new todo
todoRouter.post("/add", authMiddleware, async (req, res) => {
    const { text } = req.body;
    
    try {
        const newTodo = new todoModel({ user: req.user.id, text });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "Failed to add todo", error });
    }
});

// Toggle todo completion
todoRouter.patch("/update/:id", authMiddleware, async (req, res) => {
    const { completed } = req.body;

    try {
        const todo = await todoModel.findById(req.params.id);
        if (!todo || todo.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Todo not found" });
        }

        todo.completed = completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Failed to update todo", error });
    }
});

// Delete a todo
todoRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const todo = await todoModel.findById(req.params.id);
        if (!todo || todo.user.toString() !== req.user.id) {
            return res.status(404).json({ message: "Todo not found" });
        }

        await todo.deleteOne();
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo", error });
    }
});

module.exports = todoRouter;
