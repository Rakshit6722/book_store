import Book from "../components/BookContainer/Book"
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

export const addToTheCart = async (bookId: string | undefined) => {
    try{
        const token = localStorage.getItem('token')
        const response = await apiConnector("POST", `${BASE_URL}/add_cart_item/${bookId}`, { bookId }, { "x-access-token": token })
        return response
    }catch(err){
        console.error("Error while adding to cart", err)
        throw err
    }
}

export const getCartItem = async () => {
    try{
        const token = localStorage.getItem('token')
        const response = await apiConnector("GET", `${BASE_URL}/get_cart_items`, null, { "x-access-token": token })
        return response
    }catch(err){
        console.error("Error while getting cart items", err)
        throw err
    }
}

export const removeCartItem = async (bookId: string | undefined) => {
    try{
        const token = localStorage.getItem('token')
        const response = await apiConnector("DELETE", `${BASE_URL}/remove_cart_item/${bookId}`, { bookId }, { "x-access-token": token })
        return response
    }catch(err){
        console.error("Error while removing cart item", err)
        throw err
    }
}


export const updateCartItem = async (bookId: string | undefined, quantity: number) => {
    try{
        const token = localStorage.getItem('token')
        const response = await apiConnector("PUT", `${BASE_URL}/cart_item_quantity/${bookId}`, { quantityToBuy: quantity  }, { "x-access-token": token })
        return response
    }catch(err){
        console.error("Error while updating cart item", err)
        throw err
    }
}

export const addOrder = async (allOrders: {
    product_id: string,
    product_name: string,
    product_quantity: number,
    product_price: number
}[]) => {
    try {
        const token = localStorage.getItem('token');

        const response = await apiConnector("POST", `${BASE_URL}/add/order`, {orders: allOrders}, { "x-access-token": token });
        return response
        // console.log("RESPONSE FROM API CALL: ", response);
        // return response.status;
    } catch (error) {
        console.error("Updating Cart Items Failed", error);
        throw error;
    }
};


export const getBookReviews = async (bookId: string | undefined) => {
    try{
        const token = localStorage.getItem('token')
        const response = await apiConnector("GET", `${BASE_URL}/get/feedback/${bookId}`,null,{"x-access-token": token})
        return response
    }catch(err){
        console.error("Error while getting reviews", err)
        throw err
    }
}


export const addBookReview = async (bookId: string | undefined, comment: string, rating: number) => {
    try{
        const token = localStorage.getItem('token')
        const response = await apiConnector("POST", `${BASE_URL}/add/feedback/${bookId}`, {comment, rating}, { "x-access-token": token })
        return response
    }catch(err){
        console.error("Error while adding review", err)
        throw err
    }
}