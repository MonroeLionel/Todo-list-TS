import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import * as buffer from "buffer";
import s from './TuduList.module.css';


type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   filer: FilterValuesType
   title: string
   tasks: Array<TaskType>
   removeTask: (taskId: string) => void
   changeFilter: (value: FilterValuesType) => void
   addTask: (title: string) => void
   changeIsDone: (newid: string, e: boolean) => void
}

export function Todolist(props: PropsType) {
   const [error, setErroro] = useState<string | null>(null)
   let [title, setTitle] = useState("")

   const addTask = () => {
      if (title.trim()) {
         props.addTask(title.trim());
         setTitle("");
      } else {
         setErroro(`ошибка~~~~`)

      }
   }

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setErroro(``)

      setTitle(e.currentTarget.value)
   }

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
         addTask();
      }
   }

   const onAllClickHandler = () => props.changeFilter("all");
   const onActiveClickHandler = () => props.changeFilter("active");
   const onCompletedClickHandler = () => props.changeFilter("completed");

   const onChangeHandlerForCheackBox = (t: string, event: boolean) => {
      props.changeIsDone(t, event)
   }

   return <div>
      <h3>{props.title}</h3>
      <div>
         <input
           className={error ? s.error : ''}

           value={title}
           onChange={onChangeHandler}
           onKeyPress={onKeyPressHandler}
         />
         {error && <div>{error}</div>}
         <button onClick={addTask}>+</button>
      </div>
      <ul>
         {
            props.tasks.map(t => {

               const onClickHandler = () => props.removeTask(t.id)


               // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
               //    props.changeIsDone(t.id, event.currentTarget.checked)
               // }


               return <li className={t.isDone ? s.isDone : ``} key={t.id}>
                  <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={(event) => onChangeHandlerForCheackBox(t.id, event.currentTarget.checked)}/>
                  <span>{t.title}</span>
                  <button onClick={onClickHandler}>x</button>
               </li>
            })
         }
      </ul>
      <div>
         <button className={props.filer === `all` ? s.activeFilter : ``} onClick={onAllClickHandler}>All</button>
         <button className={props.filer === `active` ? s.activeFilter : ``} onClick={onActiveClickHandler}>Active
         </button>
         <button className={props.filer === `completed` ? s.activeFilter : ``}
                 onClick={onCompletedClickHandler}>Completed
         </button>
      </div>
   </div>
}
