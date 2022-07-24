import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {log} from "util";

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
   id: string
   title: string
   filter: FilterValuesType
}

function App() {

   // let [tasks, setTasks] = useState([
   //     {id: v1(), title: "HTML&CSS", isDone: true},
   //     {id: v1(), title: "JS", isDone: true},
   //     {id: v1(), title: "ReactJS", isDone: false},
   //     {id: v1(), title: "Rest API", isDone: false},
   //     {id: v1(), title: "GraphQL", isDone: false},
   // ]);
   let [filter, setFilter] = useState<FilterValuesType>("all");

   let todolistID1 = v1();
   let todolistID2 = v1();

   let [todolists, setTodolists] = useState<Array<todolistsType>>([
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'},
   ])

   let [tasks, setTasks] = useState({
      [todolistID1]: [
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false},
      ],
      [todolistID2]: [
         {id: v1(), title: "HTML&CSS2", isDone: true},
         {id: v1(), title: "JS2", isDone: true},
         {id: v1(), title: "ReactJS2", isDone: false},
         {id: v1(), title: "Rest API2", isDone: false},
         {id: v1(), title: "GraphQL2", isDone: false},
      ]
   });

   console.log(tasks)

   function removeTask(todolistID: string, id: string) {
      setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id != id)})
      // let filteredTasks = tasks.filter(t => t.id != id);
      // setTasks(filteredTasks);
   }

   function addTask(todolistID: string, title: string) {
      setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]})

      // let task = {id: v1(), title: title, isDone: false};
      // let newTasks = [task, ...tasks];
      // setTasks(newTasks);
   }

   function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
      let task = tasks[todolistID].find(t => t.id === taskId);
      if (task) {
         task.isDone = isDone;
      }
      setTasks({...tasks})


      // let task = tasks.find(t => t.id === taskId);
      // if (task) {
      //    task.isDone = isDone;
      // }
      //
      // setTasks([...tasks]);
   }

   function changeFilter(todolistID: string, value: FilterValuesType) {

      // let a = todolists
      // let b = a.filter(t => t.id == todolistID ? {filter: value} : t.id)
      // let c = {...b, filter: value}

      setTodolists(todolists.map(Fm => Fm.id === todolistID ? {...Fm, filter: value} : Fm))


      // setTodolists([todolists, {id: todolistID, filter:value}])
      // debugger
      // setFilter(value);
   }


   return (
     <div className="App">
        {todolists.map(t => {
           let tasksForTodolist = tasks[t.id];

           if (t.filter === "active") {
              tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
           }
           if (t.filter === "completed") {
              tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
           }

           return (
             <Todolist
               key={t.id}
               todolistID={t.id}
               title={t.title}
               tasks={tasksForTodolist}
               removeTask={removeTask}
               changeFilter={changeFilter}
               addTask={addTask}
               changeTaskStatus={changeStatus}
               filter={t.filter}
             />
           )

        })


        }

     </div>
   );
}

export default App;
