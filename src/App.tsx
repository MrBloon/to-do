import { v4 as uuidv4 } from 'uuid'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { NewTodoForm } from "./components/NewTodoForm"
import { TodoList } from "./components/TodoList"
import { state } from './initialTodos'
import { Todo } from './types'
import "./styles.css"

function App() {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({ 
    queryKey: ['todos'],
    queryFn: () => [...state.todos],
  })

  const newTodoMutation = useMutation({
    mutationFn: async (newTodo: Todo) => {
      state.todos.push(newTodo)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
    }
  })

  const updateTodoMutation = useMutation({
    mutationFn: async ({id, completed}: {id: string, completed: boolean}) => {
      state.todos = state.todos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        } else {
          return todo
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
    }
  })

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      state.todos = state.todos.filter(todo => todo.id !== id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
    } 
  })

  const addTodo = (title: string) => {
    newTodoMutation.mutate({id: uuidv4(), title, completed: false})
  }

  const deleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id)
  }
  
  const toggleTodo = (id: string, completed: boolean) => {
    updateTodoMutation.mutate({id, completed})
  }


  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    // @ts-ignore
    return <span>Error: {error.message}</span>
  }
  
  if (!data) {
    return <span>NO DATA</span>
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo}/>
      <h1 className="header">Todo list</h1>
      <TodoList todos={data} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  );
}

export default App;
