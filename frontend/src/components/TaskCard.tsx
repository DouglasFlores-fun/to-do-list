// src/components/ToDoList.tsx

import React, {useRef} from "react";
import { TaskItem } from "@interfaces";
import TaskModal from "./TaskModal";
import { deleteTask, updateTaskStatus } from "../helpers/api/api";
import SpinnerModal from "./SpinnerModal";

interface TaskCardProps {
    task: TaskItem,
    onCompleted: () => void;
}


const TaskCard: React.FC<TaskCardProps> = ( props:TaskCardProps) => {

  const modalSpinnerRef = useRef<{ startLoading: () => void, stopLoading: (resultHasError:boolean) => void } | null>(null);
  

  const updateTaskState = (taskItem: TaskItem) =>{
    modalSpinnerRef.current?.startLoading();
    updateTaskStatus(taskItem).then(()=>{
      props.onCompleted();
      modalSpinnerRef.current?.stopLoading(false);
    }).catch((error)=>{
      console.log(error);
      modalSpinnerRef.current?.stopLoading(true);
    });
  };

  const removeTask = (taskItem: TaskItem) =>{
    modalSpinnerRef.current?.startLoading();
    deleteTask(taskItem).then(()=>{
      props.onCompleted();
      modalSpinnerRef.current?.stopLoading(false);
    }).catch((error)=>{
      console.log(error);
      modalSpinnerRef.current?.stopLoading(true);
    });
  };

  return (
    <>
    <SpinnerModal ref={modalSpinnerRef} />
    <div
      key={props.task.id}
      className={`flex justify-between items-center p-4 ${
        props.task.completed ? "bg-gray-200" : "bg-white"
      } rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{props.task.title}</h2>
        <p
          className={`text-sm font-medium ${
            props.task.completed ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {props.task.completed ? "Completed" : "Pending"}
        </p>
        <p className="text-sm text-gray-600">{props.task.description}</p>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">
          Due: {props.task.dueDate}
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => {updateTaskState(props.task)}}
          className={`${!props.task.completed? "bg-green-500" : "bg-blue-500"} text-white px-3 py-2 rounded-md ${!props.task.completed? "hover:bg-green-600" : "hover:bg-blue-600"} transition-colors duration-300`}
        >
          {props.task.completed ? "Open" : "Close"}
        </button>

        <TaskModal title="Edit Task" buttonText="Edit" editItem={true} taskItem={{...props.task, dueDate: new Date(props.task.dueDate).toLocaleDateString()}} onCompleted={props.onCompleted} />

        <button
          onClick={() => {removeTask(props.task)}}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
    </>
  );
};

export default TaskCard;
