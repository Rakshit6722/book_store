import { data, NavigateFunction } from "react-router-dom"
import { apiConnector } from "../services/apiConnector"


const BASE_URL = import.meta.env.BASE_URL

export const login = async (data: { email: string, password: string }) => {
    try{
        const response = await apiConnector("POST", `${BASE_URL}/login`, data)
        return response
    }catch(err){
        throw err
    }
}

export const register = async (data: { fullName: string, email: string, password: string, phone: string }) => {
    try{
        const response = await apiConnector("POST", `${BASE_URL}/registration`, data)
        return response
    }catch(err: any){
        console.log(err.message)
    }
}