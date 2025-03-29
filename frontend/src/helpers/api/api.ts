import axios from "axios";
import { apiPath, apiUrl } from "../../app.config";
import { TaskItem } from "../../interfaces";


const instance = axios.create({
    baseURL: `${apiUrl}/api/`,
    timeout: 1000
  });

export const getTask = async () => instance.get(apiPath.task);

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

