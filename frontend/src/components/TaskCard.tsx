// src/components/ToDoList.tsx

import React from "react";
import { TaskItem } from "@interfaces";

interface TaskCardProps {
    task: TaskItem
}


const TaskCard: React.FC<TaskCardProps> = ({task}) => {

  return (
    <div
    key={task.id}
    className={`flex justify-between items-center p-4 ${task.status ? "bg-gray-200": "bg-white"} rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300`}
  >
    <div className="flex flex-col space-y-2">
      <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
      <p
        className={`text-sm font-medium ${
          task.status === true
            ? "text-green-600"
            : "text-yellow-600"
        }`}
      >
        {task.status === true ? "completed" : "pending"}
      </p>
      <p className="text-sm text-gray-600">{new Date(task.dueDate).toLocaleString()}</p>
    </div>

    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </span>
    </div>
  </div>
  );
};

export default TaskCard;
