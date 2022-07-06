import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {FullInput} from "./components/FullInput";
import {Input} from "./components/Input";

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
   addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

   let [title, setTitle] = useState("")

   // const addTask = () => {
   //    props.addTask(title);
   //    setTitle("");
   // }

   // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
   //    setTitle(e.currentTarget.value)
   // }

   // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
   //    if (e.charCode === 13) {
   //       addTask();
   //    }
   // }

   const chadButton = (value: FilterValuesType) => {
      props.changeFilter(value)
   }
   const onClickHandler = (id: string) => props.removeTask(id)

   return <div>
      <h3>{props.title}</h3>
      <div>
         <Input setTitle={setTitle} title={title}/>
         {/*<FullInput callBack={props.addTask}/>*/}
         {/*<input*/}
         {/*  value={title}*/}
         {/*  onChange={onChangeHandler}*/}
         {/*  onKeyPress={onKeyPressHandler}*/}
         {/*/>*/}
         {/*<button onClick={addTask}>+</button>*/}
      </div>
      <ul>
         {
            props.tasks.map(t => {


               return <li key={t.id}>
                  <input type="checkbox" checked={t.isDone}/>
                  <span>{t.title}</span>
                  <Button name={`x`} callBack={() => onClickHandler(t.id)}/>
                  {/*<button onClick={() => onClickHandler(t.id)}>x</button>*/}
               </li>
            })
         }
      </ul>
      <div>
         <Button name={`All`} callBack={() => chadButton(`all`)}/>
         <Button name={`Active`} callBack={() => chadButton(`active`)}/>
         <Button name={`Completed`} callBack={() => chadButton(`completed`)}/>
         {/*<button onClick={() => chadButton(`all`)}>All</button>*/}
         {/*<button onClick={() => chadButton(`active`)}>Active</button>*/}
         {/*<button onClick={() => chadButton(`completed`)}>Completed</button>*/}
      </div>
   </div>
}
