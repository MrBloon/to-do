import { v4 as uuidv4 } from 'uuid'

export let state = {
    todos: [
        {id: uuidv4(), title: "check to-do app", completed: false}, 
        {id: uuidv4(), title: "hire matthieu", completed: false}, 
    ],
  };