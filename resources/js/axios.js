import axios from 'axios';
// import store from "./store/store";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // "http://localhost/api"
});

// axiosClient.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${store.state.user.token}`;
//     return config;
// });

export default axiosClient;