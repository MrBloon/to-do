import { v4 as uuidv4 } from 'uuid'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { NewTodoForm } from "./components/NewTodoForm"
import { TodoList } from "./components/TodoList"
import { getTodos, createTodo, updateTodo, removeTodo } from './mocks/api'
import "./styles.css"

function App() {
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({ 
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  const newTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
    }
  })

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
    }
  })

  const deleteTodoMutation = useMutation({
    mutationFn: removeTodo,
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
