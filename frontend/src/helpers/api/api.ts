import axios from "axios";
import { apiPath, apiUrl } from "../../app.config";


const instance = axios.create({
    baseURL: `${apiUrl}/api/`,
    timeout: 1000
  });

export const getTask = async () => instance.get(apiPath.task);

