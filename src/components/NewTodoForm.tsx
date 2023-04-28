import { useForm, SubmitHandler } from "react-hook-form"

import { TodoFormProps, FormValues } from '../types'

export function NewTodoForm({ addTodo }: TodoFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>()
  
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        addTodo(data["item"])
        reset()
    }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New Item</label>
                <input
                    type="text"
                    id="item"
                    {...register("item", { required: true })}
                />
            </div>
            {errors.item && <span>This field is required</span>}
            <button type="submit" className="btn">Add</button>
        </form>
    )
  }