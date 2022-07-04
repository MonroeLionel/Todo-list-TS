import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {type} from "os";


export type changeTaskFilterType = `All` | `Active` | `Completed`


function App() {

    let [tasks1, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false}
    ])


    const removeTask = (elId: number) => {
        tasks1 = tasks1.filter((el) => el.id !== elId)
        setTasks(tasks1)
        console.log(tasks1)
    }

    // const changeTaskFilter = (button: changeTaskFilterType) => {
    //     setFilterValue(button)
    //     console.log(button)
    // }
    // let filterTask
    // filterTask = tasks1
    //
    // if (filerValue === `Active`) {
    //     filterTask = tasks1.filter(el => !el.isDone)
    // }
    // if (filerValue === `Completed`) {
    //     filterTask = tasks1.filter(el => el.isDone)
    // }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks1}
                      removeTask={removeTask}
                // changeTaskFilter={changeTaskFilter}
            />

        </div>
    );
}

export default App;
