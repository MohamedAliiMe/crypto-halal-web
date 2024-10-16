import axios from "axios";

// const metaTag = document.querySelector('meta[name="csrf-token"]');
// const token = metaTag ? metaTag.getAttribute("content") : null;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  withXSRFToken: true,
  headers: {
    // "X-CSRF-TOKEN": token,
    Accept: "application/json",
    "Accept-Language": "ar",
    // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;