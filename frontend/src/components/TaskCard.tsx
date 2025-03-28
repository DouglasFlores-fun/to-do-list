// src/components/ToDoList.tsx

import React from "react";
import { TaskItem } from "@interfaces";

interface TaskCardProps {
    task: TaskItem,
    onMark: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}


const TaskCard: React.FC<TaskCardProps> = ( props:TaskCardProps) => {

  return (
    <div
      key={props.task.id}
      className={`flex justify-between items-center p-4 ${
        props.task.status ? "bg-gray-200" : "bg-white"
      } rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{props.task.title}</h2>
        <p
          className={`text-sm font-medium ${
            props.task.status === true ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {props.task.status === true ? "Completed" : "Pending"}
        </p>
        <p className="text-sm text-gray-600">{props.task.description}</p>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">
          Due: {new Date(props.task.dueDate).toLocaleDateString()}
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => props.onMark(props.task.id)}
          className={`${!props.task.status? "bg-green-500" : "bg-blue-500"} text-white px-3 py-2 rounded-md ${!props.task.status? "hover:bg-green-600" : "hover:bg-blue-600"} transition-colors duration-300`}
        >
          {props.task.status ? "Open" : "Close"}
        </button>

        <button
          onClick={() => props.onEdit(props.task.id)}
          className="bg-gray-400 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
        >
          Edit
        </button>

        <button
          onClick={() => props.onDelete(props.task.id)}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
