import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookLongCard from "../components/Common/BookLongCard";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { removeWishlist } from "../api/bookApi";
import { toast } from "react-toastify";
import React from "react";

jest.mock("../api/bookApi", () => ({
  removeWishlist: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockStore = configureStore([]);
const store = mockStore({});

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("BookLongCard Component", () => {
  const book = {
    _id: "123",
    bookName: "Test Book",
    author: "John Doe",
    discountPrice: 500,
    price: 1000,
    cover: "test-image-url",
    product_date: "2024-03-25T00:00:00Z",
  };

  test("renders book details correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookLongCard book={book} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Rs. 500")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "book-cover-image" })).toBeInTheDocument();
  });

  test("removes book from wishlist on delete button click", async () => {
    (removeWishlist as jest.Mock).mockResolvedValue({ data: { success: true } });

    const getWishlistItems = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookLongCard book={book} container="wishlist" getWishlistItems={getWishlistItems} />
        </MemoryRouter>
      </Provider>
    );

    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(removeWishlist).toHaveBeenCalledWith(book._id);
      expect(mockDispatch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Item removed from wishlist");
      expect(getWishlistItems).toHaveBeenCalled();
    });
  });

  test("displays formatted order date when container is 'order'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookLongCard book={book} container="order" />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Order placed on March 25, 2024/i)).toBeInTheDocument();
  });
});
