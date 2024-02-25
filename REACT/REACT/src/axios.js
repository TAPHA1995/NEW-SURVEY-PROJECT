import axios from "axios";
import  Router from "./Router";

const axiosClient = axios.create({
    baseURL:`${import.meta.env.VITE_API_BASE_URL}/api`
})
axiosClient.interceptors.request.use((config)=>{
    const token ="12345";//TODO
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    return config
});

axiosClient.interceptors.response.use(response => {
    return response;
},error=>{
    if(error.response && error.response.status === 401){
        Router.navigate('/Login')
        return error;
    }
    throw error;
})

export default axiosClient;