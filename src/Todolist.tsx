import React, {useState} from 'react';
import {changeTaskFilterType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean

}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (elId: number) => void
    // changeTaskFilter: (button: changeTaskFilterType) => void
}


export function Todolist(props: PropsType) {
    const [filerValue, setFilterValue] = useState<changeTaskFilterType>(`All`)


    const changeTaskFilter = (button: changeTaskFilterType) => {
        setFilterValue(button)
        console.log(button)
    }
    let filterTask
    filterTask = props.tasks

    if (filerValue === `Active`) {
        filterTask = props.tasks.filter(el => !el.isDone)
    }
    if (filerValue === `Completed`) {
        filterTask = props.tasks.filter(el => el.isDone)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filterTask.map(el => {
                return (
                    <li key={el.id}>
                        <button onClick={() => props.removeTask(el.id)}>x</button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                )
            })}


        </ul>
        <div>
            <button onClick={() => changeTaskFilter(`All`)}>All</button>
            <button onClick={() => changeTaskFilter(`Active`)}>Active</button>
            <button onClick={() => changeTaskFilter(`Completed`)}>Completed</button>
        </div>
    </div>
}
