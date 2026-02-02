import { envVars } from "@/config/env";
import axios from "axios";

export const axiosInsatnece = axios.create({
  baseURL: envVars.BASE_URL,
  withCredentials: true,
});


axiosInsatnece.interceptors.request.use(
  function (config) {
   
    return config;
  },
  function (error) {
   
    return Promise.reject(error);
  }
);


axiosInsatnece.interceptors.response.use(
  function onFulfilled(response) {
  
    return response;
  },
  function onRejected(error) {
   
    return Promise.reject(error);
  }
);
