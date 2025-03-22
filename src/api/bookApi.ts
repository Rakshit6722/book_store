import { apiConnector } from "../services/apiConnector"

const BASE_URL = "https://bookstore.incubation.bridgelabz.com/bookstore_user"

export const getBooks = async () => {
    try{
        const response = await apiConnector("GET", `${BASE_URL}/get/book`)
        return response
    }catch(err){
        throw err
    }
}