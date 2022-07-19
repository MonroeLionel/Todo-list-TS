import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import Task from "./Task";


export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type TodoListPropsType = {
   listID: string
   title: string
   tasks: TaskType[]
   filter: FilterValuesType
   addTask: (title: string, todoListID: string) => void
   removeTask: (taskID: string, todoListID: string) => void
   removeTuduList: (todoListID: string) => void
   changeFilter: (filter: FilterValuesType, todoListID: string) => void
   changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void

}


const TodoList = (props: TodoListPropsType) => {
   const [title, setTitle] = useState("")
   const [error, setError] = useState<boolean>(false)
   const errorMessageStyles = {color: "hotpink"}
   const tasksListItems = props.tasks.length
     ? props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.listID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
          props.changeTaskStatus(task.id, e.currentTarget.checked, props.listID)
        return (

          <li>
             <input
               onChange={changeTaskStatus}
               type="checkbox" checked={task.isDone}
             />
             <span className={task.isDone ? "isDone" : ""}>{task.title}</span>
             <button onClick={removeTask}>x</button>
          </li>
        )
     })
     : <span>Your taskList is empty</span>

   const onClickAddTask = () => {
      const trimmedTitle = title.trim()
      if (trimmedTitle) {
         props.addTask(trimmedTitle, props.listID)
      } else {
         setError(true)
      }
      setTitle("")
   }
   const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && e.ctrlKey === true) {
         onClickAddTask()
      }
   }
   const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
      error && setError(false)
      setTitle(e.currentTarget.value)
   }
   const getChangeFilterHandler = (filter: FilterValuesType) => {
      return () => props.changeFilter(filter, props.listID)
   }
   const removeTudulist = () => {
      props.removeTuduList(props.listID)
   }

   return (
     <div>
        <h3>
           {props.title}
           <button onClick={removeTudulist}>X</button>
        </h3>
        <div>
           <input
             value={title}
             onChange={onChangeSetTitle}
             onKeyDown={onKeyDownAddTask}
             className={error ? "error" : ""}
           />
           <button onClick={onClickAddTask}>+</button>
           {error && <div style={errorMessageStyles}>Title is required!</div>}
        </div>
        <ul>
           {tasksListItems}
        </ul>
        <div>
           <button
             className={props.filter === "all" ? "active" : ""}
             onClick={getChangeFilterHandler("all")}>All
           </button>
           <button
             className={props.filter === "active" ? "active" : ""}
             onClick={getChangeFilterHandler("active")}>Active
           </button>
           <button
             className={props.filter === "completed" ? "active" : ""}
             onClick={getChangeFilterHandler("completed")}>Completed
           </button>
        </div>
     </div>
   );
}


export default TodoList;