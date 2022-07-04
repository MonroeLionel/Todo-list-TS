import React, {useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   title: string
   tasks: Array<TaskType>
   removeTask: (taskId: string) => void
   changeFilter: (value: FilterValuesType) => void
   addTask: (add: string) => void

}

export function Todolist(props: PropsType) {

   let [title, newTitle] = useState(``)

   const addTaskHandler = () => {
      props.addTask(title)
      newTitle(``)

   }
   const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      newTitle(e.currentTarget.value)
      console.log(title)
   }
   const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === `Enter`) {
         addTaskHandler()
      }
      console.log(e.key)
   }


   const SSСhangeFilterHandler = (value: FilterValuesType) => {
      props.changeFilter(value)
   }
   const removeTaskHandler = (e: string) => {
      props.removeTask(e)
   }

   return <div>
      <h3>{props.title}</h3>
      <div>
         < input onKeyPress={onKeyPressHandler} value={title} onChange={titleHandler}/>
         <button onClick={addTaskHandler}>+
         </button>
      </div>
      <ul>
         {
            props.tasks.map(
              t => {
                 // const removeTaskHandler = () => {
                 //    props.removeTask(t.id)
                 // }
                 return (
                   <li key={t.id}>
                      <input type="checkbox" checked={t.isDone}/>
                      <span>{t.title}</span>
                      <button onClick={() => removeTaskHandler(t.id)}>x</button>
                   </li>
                 )
              }
            )
         }
      </ul>
      <div>
         <button onClick={() => SSСhangeFilterHandler(`all`)}> All</button>
         <button onClick={() => SSСhangeFilterHandler(`active`)}> Active</button>
         <button onClick={() => SSСhangeFilterHandler(`completed`)}> Completed</button>
      </div>
   </div>
}
