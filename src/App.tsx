import { v4 as uuidv4 } from 'uuid'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { NewTodoForm } from "./components/NewTodoForm"
import { TodoList } from "./components/TodoList"
import { Todo } from './types'
import "./styles.css"

function App() {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({ 
    queryKey: ['todos'],
    queryFn: () => fetch('/todos').then((res) => res.json()),
  })

  const newTodoMutation = useMutation({
    mutationFn: (newTodo: Todo) => fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
    }
  })

  const updateTodoMutation = useMutation({
    mutationFn: ({id, completed}: {id: string, completed: boolean}) => fetch(`/todos/${id}`, { 
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completed),
     }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
    }
  })

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => fetch(`/todos/${id}`, 
    { method: 'DELETE' })
    .then((res) => res.json()),
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
