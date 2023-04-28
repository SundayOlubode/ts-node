import express from 'express'
import todosRouter from './routes/todos'
import bodyparser from 'body-parser'

const app = express()

app.use(bodyparser.json())

app.use(todosRouter)

app.listen(3333)