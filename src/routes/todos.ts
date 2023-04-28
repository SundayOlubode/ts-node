import { Router } from 'express'

const router = Router()
import { Todo } from '../models/todos'

let todos: Todo[] = []

type RequestBody = { text: string }
type RequestParams = { todoId: string }

router.get('/', (req, res, next) => {
    res.status(200).json({
        todos: todos
    })
})

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    }
    todos.push(newTodo)
})

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    const todoId = params.todoId
    const todoIndex = todos.findIndex((todo) => todoId === todo.id)

    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text }
        return res.status(201).json({ message: 'Updated todos', todos: todos })
    }
    return res.status(404).json({ message: 'Todo not found!' })
})

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    const todoId = params.todoId
    const todoIndex = todos.findIndex((todo) => todoId === todo.id)

    if (todoIndex >= 0) {
        todos = todos.filter(todoItem => todoItem.id !== todoId)
        return res.status(200).json({ message: 'Todo deleted!', todos: todos })
    }
    return res.status(404).json({ message: 'Todo not found!' })
})
export default router