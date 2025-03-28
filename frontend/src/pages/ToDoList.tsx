// src/components/ToDoList.tsx

import React, { useState } from "react";
import TaskCard from "@components/TaskCard";
import { TaskItem } from "@interfaces";

const ToDoList = () => {
  // Initial sample todos
  const [allTask, setAllTask] = useState<TaskItem[]>([
    { id: 1, title: "Buy groceries", description:"", status: false, dueDate: "2025-03-28T12:00:00" },
    { id: 2, title: "Finish project", description:"", status: true, dueDate: "2025-03-30T09:00:00" },
    { id: 3, title: "Clean the house", description:"", status: false, dueDate: "2025-03-29T15:00:00" },
    { id: 4, title: "Read a book", description:"", status: true, dueDate: "2025-03-27T10:00:00" },
  ]);


  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="space-y-6">
        {allTask.length === 0 ? (
          <p className="text-center text-gray-500">No tasks to show</p>
        ) : (
          allTask.map((task) => (
            <TaskCard key={task.id} task={{id: task.id, 
              description:task.description, 
              title:task.title, 
              status: task.status, 
              dueDate: task.dueDate,
            }}  
            onEdit= {(id:number)=>{console.log(id);}}
            onDelete= {(id:number)=>{console.log(id);}}
            onMark= {(id:number)=>{console.log(id);}}  />
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoList;
