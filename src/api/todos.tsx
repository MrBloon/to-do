import axios from "axios"
import { v4 as uuidv4 } from 'uuid'

const TODOS = [
    {id: uuidv4(), title: "check to-do app", completed: false}, 
    {id: uuidv4(), title: "hire matthieu", completed: false}, 
]

export function getTodos() {
  return axios
    .get("http://localhost:3000/todos")
    .then(res => res.data)
}

// export function createTodo({ title }) {
//     return axios
//       .post("http://localhost:3000/todos", {
//         id: uuidv4(),
//         title,
//         completed: false
//       })
//       .then(res => res.data)
//   }