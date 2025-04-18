import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: 
  // "http://localhost:8080/app/",
  "http://ec2-13-61-125-78.eu-north-1.compute.amazonaws.com:8080/app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default AxiosInstance;
