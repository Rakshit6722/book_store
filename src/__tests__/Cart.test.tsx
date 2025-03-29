import { render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter, useNavigate } from "react-router-dom"
import configureStore from "redux-mock-store"
import Cart from "../pages/Cart"
import React from "react"
import { getCartItem } from "../api/bookApi"
import { toast } from "react-toastify"

jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}))

jest.mock('../api/bookApi.ts', () => ({
    getCartItem: jest.fn()
}))

const mockedNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate
}))

const mockedStore = configureStore([])
const store = mockedStore({
    prevOrderList: { prevOrderList: [] },
    cart: { cart: [] },
    wishList: { wishList: [] }
})

describe("Cart component test", () => {

    beforeEach(() => {
        localStorage.clear()
    })

    test("component should render", () => {

        localStorage.setItem("token", "fake-token")

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByTestId(/myCart-text/i)).toBeInTheDocument()
    })

    test("component should render placeholder when user is not logged in", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByTestId(/placeholder-text/i)).toBeInTheDocument()
    })

    test("Cart items should be fetched successfully", async () => {
        const mockCartData = { 
            data: { 
                success: true, 
                result: [{ _id: "1", bookName: "Book 1" }] 
            } 
        };
        (getCartItem as jest.Mock).mockResolvedValue(mockCartData);
    
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );
    
        await waitFor(() => {
            expect(getCartItem).toHaveBeenCalled();
    });
    
})
})