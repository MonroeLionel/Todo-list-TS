import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import todoList from "./TodoList";
// CRUD => СRUD
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
   id: string
   title: string
   filter: FilterValuesType
}

type taskStateType = {
   [todoListID: string]: Array<TaskType>
}

function App() {
   console.log(v1())
   // BLL:
   const todoListID_1 = v1()
   const todoListID_2 = v1()


   const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
      {id: todoListID_1, title: `What to learn`, filter: "all"},
      {id: todoListID_2, title: `What to buy`, filter: "active"}
   ])

   const [tasks, setTasks] = useState<taskStateType>({
      [todoListID_1]: [
         {id: v1(), title: "HTML", isDone: true},
         {id: v1(), title: "CSS", isDone: true},
         {id: v1(), title: "JS/ES6", isDone: false},
      ],
      [todoListID_2]: [
         {id: v1(), title: "bread", isDone: true},
         {id: v1(), title: "milk", isDone: true},
         {id: v1(), title: "meat", isDone: false},
      ]
   })
   //
   const title: string = "What to learn"
   // const [tasks, setTasks] = useState<Array<TaskType>>([ //[newState, setter(fn)]
   //    {id: v1(), title: "HTML", isDone: true},
   //    {id: v1(), title: "CSS", isDone: true},
   //    {id: v1(), title: "JS/ES6", isDone: false},
   // ])
   const [filter, setFilter] = useState<FilterValuesType>("all")

   const removeTask = (taskID: string, todoListID: string): void => {
      //
      // const todoListsTask=tasks[todoListID]
      // const updateTask=todoListsTask.filter((task: TaskType) => task.id !== taskID)
      // const copyTask={...tasks}
      // copyTask[todoListID]=updateTask
      // setTasks(copyTask)
      //
      // setTasks(tasks.filter((task: TaskType) => task.id !== taskID))
      setTasks({...tasks, [todoListID]: tasks[todoListID].filter((task: TaskType) => task.id !== taskID)})

   }
   const addTask = (title: string, todoListID: string) => {
      const todoListsTask = tasks[todoListID]
      const updateTask = [{id: v1(), title, isDone: false}, ...todoListsTask]
      const copyTask = {...tasks}
      copyTask[todoListID] = updateTask
      setTasks(copyTask)
      // //
      // const id = v1()
      // const isDone = false
      // setTasks([{id, title, isDone}, ...tasks])

      setTasks({...tasks, [todoListID]: [{id: v1(), title, isDone: false}, ...tasks[todoListID]]})
   }
   const changeFilter = (filter: FilterValuesType, todoListID: string) => {
      setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
      // setFilter(filter)
   }
   const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)})

      // setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
   }

   const removeTuduList = (todoListID: string) => {
      setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
      delete tasks[todoListID]
   }

   // UI:
   const tuduListComponents = todoLists.map(tl => {

      let tasksForRender;
      switch (tl.filter) {
         case "completed":
            tasksForRender = tasks[tl.id].filter(t => t.isDone)
            break
         case "active":
            tasksForRender = tasks[tl.id].filter(t => !t.isDone)
            break
         default:
            tasksForRender = tasks[tl.id]
      }
      return (
        <TodoList
          key={tl.id}
          listID={tl.id}
          title={tl.title}
          filter={tl.filter}
          tasks={tasksForRender}

          addTask={addTask}
          removeTask={removeTask}
          removeTuduList={removeTuduList}
          changeFilter={changeFilter}
          changeTaskStatus={changeTaskStatus}
        />
      )
   })

   //

   return (
     <div className="App">

        {tuduListComponents}

     </div>
   );
}

export default App;
