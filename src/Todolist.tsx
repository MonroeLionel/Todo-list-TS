import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import Task from "./Task";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type TodoListPropsType = {
   todoListID: string
   title: string
   tasks: TaskType[]
   filter: FilterValuesType
   addTask: (title: string, id: string) => void
   removeTask: (taskID: string, id: string) => void
   removeTodoList: (id: string) => void
   changeFilter: (filter: FilterValuesType, id: string) => void
   changeTaskStatus: (taskID: string, isDone: boolean, id: string) => void
   changeTaskTitle: (taskID: string, title: string, id: string) => void
   changeTuduListTitle: (title: string, id: string) => void
}


const TodoList = (props: TodoListPropsType) => {

   const tasksListItems = props.tasks.length
     ? props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
          props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)

        const changeTaskTitle = (title: string) => {
           props.changeTaskTitle(task.id, title, props.todoListID)
        }
        return (
          <li key={task.id}>
             <input
               onChange={changeTaskStatus}
               type="checkbox" checked={task.isDone}
             />
             {/*<span className={task.isDone ? "isDone" : ""}>{task.title}</span>*/}
             <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
             <button onClick={removeTask}>x</button>
          </li>
        )
     })
     : <span>Your taskList is empty</span>


   const getChangeFilterHandler = (filter: FilterValuesType) => {
      return () => props.changeFilter(filter, props.todoListID)
   }
   const changeTuduListTitle = (title: string) => {
      props.changeTuduListTitle(title, props.todoListID)
   }
   const removeTodoList = () => props.removeTodoList(props.todoListID)
   const addTask = (title: string) => {
      props.addTask(title, props.todoListID)
   }
   return (
     <div>
        <h3>
           {/*{props.title}*/}
           <EditableSpan title={props.title} changeTitle={changeTuduListTitle}/>
           <button onClick={removeTodoList}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
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
};

export default TodoList;