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

export const addWishlist = async (bookId: string | undefined) => {
    try{
        const token = localStorage.getItem('token')
        const response = await apiConnector("POST", `${BASE_URL}/add_wish_list/${bookId}`, { bookId }, { "x-access-token": token })
        return response
    }catch(err){
        console.error("Error while adding to wishlist", err)
        throw err
    }
}

export const removeWishlist = async (bookId: string | undefined) => {
    try{
        const token = localStorage.getItem('token')
        const response = await apiConnector("DELETE", `${BASE_URL}/remove_wishlist_item/${bookId}`, { bookId }, { "x-access-token": token })
        return response
    }catch(err){
        console.error("Error while adding to wishlist", err)
        throw err
    }
}

export const getWishlist = async () => {
    try{
        const token = localStorage.getItem('token')
        const response = await apiConnector("GET", `${BASE_URL}/get_wishlist_items` , null , { "x-access-token": token })
        return response
    }catch(err){
        console.error("Error while adding to wishlist", err)
        throw err
    }
}