import React from 'react'
import { getBooks } from '../api/bookApi'
import { render, screen, waitFor } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { SearchContext } from '../context/SearchProvider'
import BookCatalogue from '../components/BookContainer/BookCatalogue'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../api/bookApi.ts', () => ({
    getBooks: jest.fn()
}))

const mockedStore = configureStore([])

const initialState = {
    bookList: { bookList: [], loading: false }
}

const mockSearchContext = {
    sortQuery: '',
    searchQuery: ''
}

const renderComponent = (store: any, searchContext = mockSearchContext) => {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <SearchContext.Provider value={searchContext}>
                    <BookCatalogue />
                </SearchContext.Provider>
            </MemoryRouter>
        </Provider>
    )
}

describe("Book Catalogue component test", () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    beforeAll(() => {
        jest.spyOn(console, "log").mockImplementation(() => { });
        global.matchMedia = global.matchMedia || function() {
            return {
              matches: false,
              addListener: jest.fn(),
              removeListener: jest.fn(),
            };
          };
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("component should render", () => {
        const store = mockedStore(initialState)
        renderComponent(store)
        expect(screen.getByTestId(/bookcatalogue-div/i)).toBeInTheDocument()

    })

    test("component should render loading", () => {
        const store = mockedStore({
            bookList: { bookList: [], loading: true }
        })
        renderComponent(store)
        expect(screen.getByTestId(/loading-div/i)).toBeInTheDocument()
    })

    test("component should called getBookList on initial render", () => {
        const store = mockedStore(initialState)
        renderComponent(store)
        expect(getBooks).toHaveBeenCalled()
    })

    test("component should render book list", async () => {

        (getBooks as jest.Mock).mockResolvedValue({
            data: {
                success: true,
                result: [{ _id: '1', bookName: 'Book 1', price: 10, author: 'Author 1' }]
            }
        })


        const store = mockedStore({
            bookList: { bookList: [{ _id: '1', bookName: 'Book 1', price: 10, author: 'Author 1' }], loading: false }
        })
        renderComponent(store)
        await waitFor(() => {
            expect(screen.getByText(/Book 1/i)).toBeInTheDocument()
        })
    })


    test("should render no book available when bookList is empty", () => {
        const store = mockedStore({
            bookList: { bookList: [], loading: false }
        })

        renderComponent(store)

        expect(screen.getByText(/No books available/i)).toBeInTheDocument()
    })

    test("should render pagination when more books are available than the page size", () => {
        const store = mockedStore({
            bookList: {
                bookList: [
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                    {
                        _id: '1',
                        bookName: 'Book 1',
                        price: 10,
                        author: 'Author 1'
                    },
                ]
            }
        })

        renderComponent(store)
        expect(screen.getByTestId(/pagination-div/i)).toBeInTheDocument()
    })

    test("should not show pagination when no book is available on the page", () => {
        const store = mockedStore({
            bookList: {
                bookList: [],
                loading: false
            }
        })

        renderComponent(store)

        expect(screen.queryByTestId(/pagination-div/i)).not.toBeInTheDocument()
    })

    test('should filter books based on searchQuery', () => {
        const store = mockedStore({
            bookList: { bookList: [
                { _id: '1', bookName: 'Book 1', price: 10, author: 'Author 1' },
                { _id: '2', bookName: 'Book 2', price: 15, author: 'Author 2' }
            ], loading: false }
        });
    
        const searchContext = {
            searchQuery: 'Book 1',
            sortQuery: ''
        };
    
        renderComponent(store, searchContext);
      expect(screen.getByText(/Book 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/Book 2/i)).toBeNull(); 
    });

    test('should sort books based on sortQuery', () => {
        const store = mockedStore({
            bookList: { bookList: [
                { _id: '1', bookName: 'Book 1', price: 10, author: 'Author 1' },
                { _id: '2', bookName: 'Book 2', price: 15, author: 'Author 2' }
            ], loading: false }
        });
    
        const searchContext = {
            searchQuery: '',
            sortQuery: 'lowToHigh'
        };
    
        renderComponent(store, searchContext);
    
      
        const bookPrices = screen.getAllByTestId('book-price'); 
        expect(parseInt(bookPrices[0].textContent || "")).toBeLessThan(parseInt(bookPrices[1].textContent || "")); 
    });
    
    
})