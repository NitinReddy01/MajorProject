import axios from "axios";

const url='http://localhost:9000/api';

export default axios.create({
    baseURL:url,
    withCredentials:true
})

export const axiosPrivate = axios.create({
    baseURL:url,
    withCredentials:true
})