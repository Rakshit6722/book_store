import axios, { AxiosResponse, Method } from "axios";

const axiosInstance = axios.create({})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error", error.message);
        return Promise.reject(error);
    }
)

export const apiConnector = (method: Method, url: string, data?: any, headers?: any): Promise<AxiosResponse> => {
    return axiosInstance({
        method,
        url,
        data: data || undefined,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })
}