import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Dropdown } from "antd";
import { SearchContext } from "../context/SearchProvider";
import BookContainer from "../components/BookContainer/BookContainer";
import { MemoryRouter } from "react-router-dom";
import { removeCartItem, removeWishlist } from "../api/bookApi";

jest.mock('../api/bookApi', () => ({
    removeWishlist: jest.fn(),
    removeCartItem: jest.fn(),
    getBooks: jest.fn(() => Promise.resolve({ data: { result: [] } })),
}));

const mockedStore = configureStore([]);

describe("BookContainer", () => {
    let store: any;
    let setSortQueryMock: jest.Mock;

    beforeAll(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    })

    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        store = mockedStore({
            bookList: { bookList: [{ id: 1, title: "Test Book" }] },
        });
        store.dispatch = jest.fn();
        setSortQueryMock = jest.fn();
    });

    it("renders book count correctly", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                <SearchContext.Provider value={{ setSortQuery: setSortQueryMock }}>
                    <BookContainer />
                </SearchContext.Provider>
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("(1 items)")).toBeInTheDocument();
    });

    it("renders sorting dropdown and triggers sort function", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                <SearchContext.Provider value={{ setSortQuery: setSortQueryMock }}>
                    <BookContainer />
                </SearchContext.Provider>
                </MemoryRouter>
            </Provider>
        );

        const dropdownButton = screen.getByText("Sort by relevance");
        expect(dropdownButton).toBeInTheDocument();

        fireEvent.click(dropdownButton);

        const highToLowOption = await screen.findByText("Price: High to Low");
        fireEvent.click(highToLowOption);

        waitFor(() => {
            expect(setSortQueryMock).toHaveBeenCalledWith("highToLow");
        })
    });
});
