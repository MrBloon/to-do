export interface Todo {
    id: string
    title: string
    completed: boolean
}

export interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

export interface TodoItemProps {
    id: string;
    completed: boolean;
    title: string;
    toggleTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

export interface TodoFormProps {
    addTodo: (title: string) => void
}

export type FormValues = {
    item: string;
}