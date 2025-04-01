import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter, useNavigate } from "react-router-dom"
import configureStore from "redux-mock-store"
import Cart from "../pages/Cart"
import React from "react"
import { addOrder, getCartItem, removeCartItem } from "../api/bookApi"
import { toast } from "react-toastify"

jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}))

jest.mock('../api/bookApi.ts', () => ({
    getCartItem: jest.fn(),
    addOrder: jest.fn(),
    removeCartItem: jest.fn()
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

    test("place order button should be present initially inside the component", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        waitFor(() => {
            expect(screen.getByTestId(/placeorder-button/i)).toBeInTheDocument()
        })
    })

    test("on clicking on place order it should open up address details accordion", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByText(/customer/i)).not.toBeInTheDocument()

        waitFor(() => {
            expect(screen.getByTestId(/placeorder-button/i)).toBeInTheDocument()
            fireEvent.click(screen.getByTestId(/placeorder-button/i))
            expect(screen.findByText(/customer/i)).toBeInTheDocument()
        })
    })

    test("on clickin on continue order summary accordion should open", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByText(/customer/i)).not.toBeInTheDocument()

        waitFor(() => {
            expect(screen.getByTestId(/placeorder-button/i)).toBeInTheDocument()
            fireEvent.click(screen.getByTestId(/placeorder-button/i))
            fireEvent.click(screen.getByTestId(/addresscontinue-button/i))
            expect(screen.getByTestId(/ordersummarycheckout-button/i)).toBeInTheDocument()
        })
    })

    test("should display 'No items in the cart' when the cart is empty", async () => {
        localStorage.setItem("token", "fake-token");

        (getCartItem as jest.Mock).mockResolvedValue({
            data: { success: true, result: [] },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/no items in the cart/i)).toBeInTheDocument();
        });
    });

    test("clicking Checkout button calls handleCheckout function", async () => {
        const mockCartData = {
            data: {
                success: true,
                result: [{ _id: "1", name: "Book 1", quantityToBuy: 1, discountPrice: 100, price: 150 }],
            },
        };
        (getCartItem as jest.Mock).mockResolvedValue(mockCartData);
        (addOrder as jest.Mock).mockResolvedValue({ data: { success: true } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.click(screen.getByTestId("placeOrder-button"));
            fireEvent.click(screen.getByTestId("addresscontinue-button"))
            fireEvent.click(screen.getByTestId("ordersummaryCheckout-button"))
            expect(addOrder).toHaveBeenCalled();
        })

    });

    test("should call toast.success when order is placed successfully", async () => {
        (addOrder as jest.Mock).mockResolvedValue({ data: { success: true } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        waitFor(() => {
            fireEvent.click(screen.getByTestId("placeOrder-button"));
            fireEvent.click(screen.getByTestId("addresscontinue-button"))
            fireEvent.click(screen.getByTestId("ordersummaryCheckout-button"))
            expect(toast.success).toHaveBeenCalledWith("Order placed successfully");

        })
    });

    test("should call toast.error when order placement fails", async () => {
        (addOrder as jest.Mock).mockRejectedValue(new Error("Checkout failed"));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.click(screen.getByTestId("placeOrder-button"));
            fireEvent.click(screen.getByTestId("addresscontinue-button"))
            fireEvent.click(screen.getByTestId("ordersummaryCheckout-button"))
            expect(toast.error).toHaveBeenCalled();
        })
    });
    test("should call removeCartItem for each item after checkout", async () => {
        const mockCartData = {
            data: {
                success: true,
                result: [{ _id: "1", name: "Book 1", quantityToBuy: 1, discountPrice: 100, price: 150 }],
            },
        };
        (getCartItem as jest.Mock).mockResolvedValue(mockCartData);
        (addOrder as jest.Mock).mockResolvedValue({ data: { success: true } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        waitFor(() => {
            fireEvent.click(screen.getByTestId("placeOrder-button"));
            fireEvent.click(screen.getByTestId("addresscontinue-button"))
            fireEvent.click(screen.getByTestId("ordersummaryCheckout-button"))
            expect(removeCartItem).toHaveBeenCalledWith("1");

        })
    });

    test("clicking Checkout button calls handleCheckout function and removes items", async () => {
        const mockCartData = {
            data: {
                success: true,
                result: [{ _id: "1", name: "Book 1", quantityToBuy: 1, discountPrice: 100, price: 150 }],
            },
        };
        (getCartItem as jest.Mock).mockResolvedValue(mockCartData);
        (addOrder as jest.Mock).mockResolvedValue({ data: { success: true } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        );

        waitFor(() => {
            expect(screen.getByTestId("placeOrder-button")).toBeInTheDocument();
            fireEvent.click(screen.getByTestId("placeOrder-button"));
            expect(screen.getByTestId("addresscontinue-button")).toBeInTheDocument();
            fireEvent.click(screen.getByTestId("addresscontinue-button"));
            expect(screen.getByTestId("ordersummaryCheckout-button")).toBeInTheDocument();
            fireEvent.click(screen.getByTestId("ordersummaryCheckout-button"));
            expect(addOrder).toHaveBeenCalled();
            expect(removeCartItem).toHaveBeenCalledWith("1");
            expect(toast.success).toHaveBeenCalledWith("Order placed successfully");
        });
    });

});

