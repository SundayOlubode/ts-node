"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({
        todos: todos
    });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
});
router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex((todo) => todoId === todo.id);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(201).json({ message: 'Updated todos', todos: todos });
    }
    return res.status(404).json({ message: 'Todo not found!' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex((todo) => todoId === todo.id);
    if (todoIndex >= 0) {
        todos = todos.filter(todoItem => todoItem.id !== todoId);
        return res.status(200).json({ message: 'Todo deleted!', todos: todos });
    }
    return res.status(404).json({ message: 'Todo not found!' });
});
exports.default = router;
