import React from 'react'
import configureStore from 'redux-mock-store'
import CartSection from '../components/Cart/CartSection'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import { removeCartItem, updateCartItem } from '../api/bookApi'

jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}))

jest.mock("../api/bookApi",() => ({
    removeCartItem: jest.fn(),
    updateCartItem: jest.fn()
}))

const mockedStore = configureStore([])

const intialState = {
    cart: { cart: [] }
}

describe("CartSection Component", () => {

    let store: any

    beforeEach(() => {
        store = mockedStore(intialState)
        store.dispatch = jest.fn()
    })


    const book = {
        _id:"12345",
        bookName: "Test Book",
        author: "Test Author",
        price: 100,
        discountPrice: 80,
        cover: "test_cover.jpg",
    }

    const product_id = "12345"
    const getCartItems = jest.fn()

    const incrementCart = jest.fn()
    const decrementCart = jest.fn()
    const removeItemFromCart = jest.fn()

    test("renders book details correctly", () => {
        render(
            <Provider store={store}>
                <CartSection book={book} product_id={product_id} getCartItems={getCartItems} />
            </Provider>
        )

        expect(screen.getByText(/Test Book/i)).toBeInTheDocument()
        expect(screen.getByText(/Test Author/i)).toBeInTheDocument()
        expect(screen.getByText(/100/i)).toBeInTheDocument()
    })

    test("renders cartCount,increment and decrement buttons",() => {
        render(
            <Provider store={store}>
                <CartSection book={book} product_id={product_id} getCartItems={getCartItems} />
            </Provider>
        )

        expect(screen.getByTestId(/Increment/i)).toBeInTheDocument()
        expect(screen.getByTestId(/Decrement/i)).toBeInTheDocument()
        expect(screen.getByTestId(/cartcount/i)).toBeInTheDocument()
    })

    test("renders remove button", () => {
        render(
            <Provider store={store}>
                <CartSection book={book} product_id={product_id} getCartItems={getCartItems} />
            </Provider>
        )

        expect(screen.getByText(/Remove/i)).toBeInTheDocument()
    })

    test("calls removeItemFromCart and removeCartItem api function when remove button is clicked", () => {

        (removeCartItem as jest.Mock).mockResolvedValue({ data: {success: true} })

        render(
            <Provider store={store}>
                <CartSection book={book} product_id={product_id} getCartItems={getCartItems} />
            </Provider>
        )

        const removeButton = screen.getByText(/Remove/i)
        removeButton.click()

        waitFor(() => {
            expect(removeItemFromCart).toHaveBeenCalled()
            expect(removeCartItem).toHaveBeenCalledWith(product_id)
            expect(getCartItems).toHaveBeenCalled()
            expect(store.dispatch).toHaveBeenCalledWith({ type: 'cart/removeFromCart', payload: product_id })
        })
    })
    
    test("calls incrementCart and updateCartItem api function when increment button is clicked", () => {
        (updateCartItem as jest.Mock).mockResolvedValue({ data: {success: true} })

        render(
            <Provider store={store}>
                <CartSection book={book} product_id={product_id} getCartItems={getCartItems} />
            </Provider>
        )

        const incrementButton = screen.getByTestId(/Increment/i)
        incrementButton.click()

        waitFor(() => {
            expect(incrementCart).toHaveBeenCalled()
            expect(updateCartItem).toHaveBeenCalledWith(book._id, 2)
            expect(store.dispatch).toHaveBeenCalledWith({ type: 'cart/incrementQuantity', payload: product_id })
        })
    })

    test("calls decrementCart and updateCartItem api function when decrement button is clicked", () => {
        (updateCartItem as jest.Mock).mockResolvedValue({ data: {success: true} })

        render(
            <Provider store={store}>
                <CartSection book={book} product_id={product_id} getCartItems={getCartItems} />
            </Provider>
        )

        const decrementButton = screen.getByTestId(/Decrement/i)
        decrementButton.click()

        waitFor(() => {
            expect(decrementCart).toHaveBeenCalled()
            expect(updateCartItem).toHaveBeenCalledWith(book._id, 1)
            expect(store.dispatch).toHaveBeenCalledWith({ type: 'cart/decrementQuantity', payload: product_id })
        })
    })

})