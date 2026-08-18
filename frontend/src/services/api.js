import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:5000/api"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const analyzeIdea = (data)=>{
    return API.post("/analyze",data);
}
export const getHistory = ()=>{
    return API.get("/history")
}
export const deleteIdea = (id) =>{
    return API.delete(`/history/${id}`);
}

export default API;

