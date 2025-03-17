import { apiConnector } from "../services/apiConnector"

const BASE_URL = "https://bookstore.incubation.bridgelabz.com/bookstore_user"

export const login = async (data: { email: string, password: string }) => {
    try{
        const response = await apiConnector("POST", `${BASE_URL}/login`, data)
        console.log("response", response)
    }catch(err){
        throw err
    }
}