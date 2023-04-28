import { Todo } from '../types'

export function getTodos() {
    return fetch('/todos').then((res) => res.json())
}

export function createTodo(newTodo: Todo) {
    return fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      })
      .then((res) => res.json())
}

export function updateTodo({id, completed}: {id: string, completed: boolean}) {
    return fetch(`/todos/${id}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completed),
       })
       .then((res) => res.json())
}

export function deleteTodo(id: string) {
    return fetch(`/todos/${id}`, { 
    method: 'DELETE' })
    .then((res) => res.json())
}