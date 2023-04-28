
import { v4 as uuidv4 } from 'uuid'
import { rest } from 'msw'

import { state } from '../initialTodos'

const handlers = [
  rest.get('/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(state.todos)
    )
  }),
  rest.post('/todos', async (req, res, ctx) => {
    const newTodo = await req.json()

    if (!newTodo) {
      return res(ctx.status(400), ctx.json({ message: 'Title is required' }));
    }
  
    state.todos.push(newTodo)

    return res(ctx.status(201), ctx.json(newTodo));
  }),
  rest.patch('/todos/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const completed = await req.json()

    const index = state.todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      return res(ctx.status(404), ctx.json({ message: `Todo with id ${id} not found` }));
    }

    state.todos[index].completed = completed;

    return res(ctx.status(200), ctx.json(state.todos[index]));
  }),
  rest.delete('/todos/:id', (req, res, ctx) => {
    const { id } = req.params;

    const index = state.todos.findIndex((todo) => todo.id === id)

    if (index === -1) {
      return res(ctx.status(404), ctx.json({ message: 'Todo not found' }))
    }

    const deletedTodo = state.todos.splice(index, 1)[0]

    return res(ctx.status(200), ctx.json(deletedTodo))
  }),
]

export { handlers }