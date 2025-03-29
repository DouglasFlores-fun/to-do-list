// src/components/ToDoList.tsx

import React, { useState, useEffect} from "react";
import TaskCard from "@components/TaskCard";
import { TaskItem } from "@interfaces";
import { getTask } from "../helpers/api/api";
import TaskModal from "../components/TaskModal";
import SpinnerModal from "../components/SpinnerModal";


interface iFilters {
  status:number,
  sortBy: string,
  orderDirection: number,
}

const ToDoList = () => {
  // Initial sample todos
  

  const [allTask, setAllTask] = useState<TaskItem[]>([]);
  const [filters, setFilters] = useState<iFilters>({status:-1, sortBy:"due_date", orderDirection:1});

  const [error, setError] = useState<string>("");

  useEffect(()=>{
    reaload();
  },[filters]);

  const reaload = ()=>{
    getTask(filters).then((response)=>{
      const data:[TaskItem] = response.data.map((item)=>{return {...item, dueDate: new Date(item.due_date).toLocaleDateString()}}) as [TaskItem];
      setAllTask(data);
    }).catch((error)=>{
      setAllTask([]);
      setError("Can't load task, try again");
    });
  }

  const handleFilterStatusSelection = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    setFilters({...filters, status: Number(e.target.value)});
  }

  const handleSort = (e:React.MouseEvent<HTMLButtonElement>)=>{
    setFilters({...filters, sortBy: "dueDate", orderDirection: filters.orderDirection === 1 ? -1 : 1});
  }

  

  

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-6">To Do List</h1>
      {/* Header List / Actions buttons */}
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="flex space-x-1">
         <TaskModal editItem={false} buttonText="Add Task" title="Add Task" taskItem={{ id:0, title:"", description:"", completed: false, dueDate: "" }} onCompleted={()=>{reaload()}}/>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="flex space-x-4">
          <select
            className="p-3 border-2 border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
            onChange={handleFilterStatusSelection}
            value={filters.status.toString()}
          >
            <option value="-1">All Status</option>
            <option value="0">Pending</option>
            <option value="1">Completed</option>
          </select>
        </div>
        <div className="flex space-x-4">
            <div className="flex space-x-4">
              <button
                className="p-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
                onClick={handleSort}
              >
                  Due Date ({filters.orderDirection === 1 ? "↑" : "↓"})
              </button>
          </div>
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
