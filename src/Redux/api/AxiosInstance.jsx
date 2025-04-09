import axios from "axios";

const AxiosInstance = axios.create({
  baseURL:
  //  "http://localhost:8080/app/",
  "http://ec2-51-21-224-240.eu-north-1.compute.amazonaws.com:8080/app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
