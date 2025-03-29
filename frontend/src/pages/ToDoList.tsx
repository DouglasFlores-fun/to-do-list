// src/components/ToDoList.tsx

import React, { useState, useEffect } from "react";
import TaskCard from "@components/TaskCard";
import { TaskItem } from "@interfaces";
import { getTask } from "../helpers/api/api";
import TaskModal from "../components/TaskModal";

const ToDoList = () => {
  // Initial sample todos
  const [allTask, setAllTask] = useState<TaskItem[]>([]);

  const [error, setError] = useState<string>("");

  useEffect(()=>{
    reaload();
  },[]);

  const reaload = ()=>{
    getTask().then((response)=>{
      const data:[TaskItem] = response.data as [TaskItem];
      setAllTask(data);
    }).catch((error)=>{
      setAllTask([]);
      setError("Can't load task, try again");
    });
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-6">To Do List</h1>
      {/* Header List / Actions buttons */}
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="flex space-x-1">
         <TaskModal onCompleted={()=>{reaload()}}/>
        </div>
      </div>

      {/* TO DO LIST */}
      <div className="space-y-6">
        {error ? <p className="text-center text-gray-500">{error}</p> : <></>}
        {allTask.length === 0 ? (
          <p className="text-center text-gray-500">No tasks to show</p>
        ) : (
          allTask.map((task) => (
            <TaskCard key={task.id} task={{id: task.id, 
              description:task.description, 
              title:task.title, 
              completed: task.completed, 
              dueDate: task.dueDate,
            }}  
            onCompleted={reaload}
            onDelete= {(id:number)=>{console.log(id);}}
            onMark= {(id:number)=>{console.log(id);}}  />
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoList;
