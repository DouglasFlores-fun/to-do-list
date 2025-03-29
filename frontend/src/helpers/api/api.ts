import axios from "axios";
import { apiPath, apiUrl } from "../../app.config";
import { TaskItem } from "../../interfaces";


const instance = axios.create({
    baseURL: `${apiUrl}/api/`,
    timeout: 1000
  });

interface iFilters {
  status?:number;
  orderBy?: string;
  orderDirection?: number;
}

export const getTask = async (filters:iFilters) => {
  const params = {};


  if(typeof filters.status !== "undefined" && filters.status >=0 ){
    params.completed = filters.status;
  }


  return instance.get(apiPath.task, {
    params: params,
  });

}

export const createTask = async (taskItem:TaskItem) => instance.post(apiPath.task, JSON.stringify({...taskItem, due_date: taskItem.dueDate}), {
  headers: {
    "Content-Type": "application/json", 
  }
});

export const updateTask = async (taskItem:TaskItem) => instance.put(`${apiPath.task}/${taskItem.id}`, JSON.stringify({...taskItem, due_date: taskItem.dueDate}), {
  headers: {
    "Content-Type": "application/json", 
  }
});

export const updateTaskStatus = async (taskItem:TaskItem) => instance.put(`${apiPath.task}/${taskItem.id}`, JSON.stringify({completed: !taskItem.completed}), {
  headers: {
    "Content-Type": "application/json", 
  }
});

export const deleteTask = async (taskItem:TaskItem) => instance.delete(`${apiPath.task}/${taskItem.id}`);

