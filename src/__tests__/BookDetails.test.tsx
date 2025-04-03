import React from "react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import BookDetails from "../components/BookDetails/BookDetails";
import { addToTheCart, addWishlist, getBookReviews, removeWishlist, updateCartItem } from "../api/bookApi";
import { toast } from "react-toastify";

jest.mock("../api/bookApi", () => ({
  addToTheCart: jest.fn(),
  addWishlist: jest.fn(),
  getBookReviews: jest.fn(),
  removeWishlist: jest.fn(),
  updateCartItem: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockStore = configureStore([]);

describe("Book Details Component Test", () => {
  const bookDetails = {
    _id: "1",
    bookName: "testBook1",
    author: "testAuthor",
    description: "testDescription",
    discountPrice: 1400,
    price: 2000,
    quantity: 10,
  };

  const renderComponent = (storeData = {}, initialEntries = ["/book/1"]) => {
    const store = mockStore({
      wishList: { wishList: [] },
      bookList: { bookList: [bookDetails] },
      cart: { cart: [] },
      ...storeData,
    });

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <BookDetails />
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });


  test("component renders all book details and UI elements", () => {
    renderComponent();
    expect(screen.getByText("testBook1")).toBeInTheDocument();
    expect(screen.getByText(/by testAuthor/i)).toBeInTheDocument();
    expect(screen.getByText("testDescription")).toBeInTheDocument();
    expect(screen.getByText("Rs. 1400")).toBeInTheDocument();
    expect(screen.getByText("2000")).toBeInTheDocument();
    expect(screen.getByText("Book Details")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument(); 
    expect(screen.getByText("(20)")).toBeInTheDocument(); 
    expect(screen.getAllByAltText(/book-image-/i)).toHaveLength(5);
    expect(screen.getByAltText("main-book-image")).toBeInTheDocument(); 
  });


  test("clicking thumbnail changes main image", () => {
    renderComponent();
    const thumbnails = screen.getAllByAltText(/book-image-/i);
    fireEvent.click(thumbnails[1]);
    expect(thumbnails[1].parentElement).toHaveClass("border-red-500");
    expect(thumbnails[0].parentElement).toHaveClass("border-[#E0E0E0]");
  });


  test("logged-out user cannot add to wishlist and sees login error", async () => {
    renderComponent();
    expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("wishlist-button"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Login first");
      expect(addWishlist).not.toHaveBeenCalled();
      expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
    });
  });

 
  test("adds book to wishlist when logged in", async () => {
    (addWishlist as jest.Mock).mockResolvedValue({ data: { message: "Item added to wish list" } });
    localStorage.setItem("token", "fake-token");
    renderComponent();
    fireEvent.click(screen.getByTestId("wishlist-button"));
    await waitFor(() => {
      expect(addWishlist).toHaveBeenCalledWith("1");
      expect(toast.success).toHaveBeenCalledWith("Item added to wishlist");
      expect(screen.getByText(/wishlisted/i)).toBeInTheDocument();
    });
  });


  test("removes book from wishlist", async () => {
    (removeWishlist as jest.Mock).mockResolvedValue({ data: { success: true } });
    localStorage.setItem("token", "fake-token");
    renderComponent({ wishList: { wishList: [bookDetails] } });
    expect(screen.getByText(/wishlisted/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/wishlisted/i));
    await waitFor(() => {
      expect(removeWishlist).toHaveBeenCalledWith("1");
      expect(toast.success).toHaveBeenCalledWith("Removed from wishlist");
      expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
    });
  });


  test("logged-out user cannot add to cart", async () => {
    renderComponent();
    expect(screen.getByTestId("addToCart-button")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("addToCart-button"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Login first");
      expect(addToTheCart).not.toHaveBeenCalled();
    });
  });

  
  test("add to bag button adds item to cart", async () => {
    (addToTheCart as jest.Mock).mockResolvedValue({ data: { success: true, result: { product_id: "1", quantityToBuy: 1 } } });
    localStorage.setItem("token", "fake-token");
    renderComponent();
    fireEvent.click(screen.getByTestId("addToCart-button"));
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Item added to cart");
      expect(screen.getByTestId("cartCount")).toHaveTextContent("1");
      expect(screen.getByTestId("incrementButton")).toBeInTheDocument();
      expect(screen.getByTestId("decrementButton")).toBeInTheDocument();
    });
  });

  
  test("increment button increases cart quantity", async () => {
    (addToTheCart as jest.Mock).mockResolvedValue({ data: { success: true } });
    (updateCartItem as jest.Mock).mockResolvedValue({ data: { success: true } });
    localStorage.setItem("token", "fake-token");
    renderComponent();
    fireEvent.click(screen.getByTestId("addToCart-button"));
    await waitFor(() => {
      expect(screen.getByTestId("cartCount")).toHaveTextContent("1");
    });
    fireEvent.click(screen.getByTestId("incrementButton"));
    await waitFor(() => {
      expect(screen.getByTestId("cartCount")).toHaveTextContent("2");
      expect(updateCartItem).toHaveBeenCalledWith("1", 2);
    });
  });


  test("increment stops at max quantity with error", async () => {
    (updateCartItem as jest.Mock).mockResolvedValue({ data: { success: true } });
    localStorage.setItem("token", "fake-token");
    renderComponent({ cart: { cart: [{ product_id: "1", quantityToBuy: 10 }] } });
    fireEvent.click(screen.getByTestId("incrementButton"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Quantity exceeds the available quantity");
      expect(screen.getByTestId("cartCount")).toHaveTextContent("10");
    });
  });


  test("decrement button decreases cart quantity", async () => {
    (updateCartItem as jest.Mock).mockResolvedValue({ data: { success: true } });
    localStorage.setItem("token", "fake-token");
    renderComponent({ cart: { cart: [{ product_id: "1", quantityToBuy: 2 }] } });
    await waitFor(() => {
      expect(screen.getByTestId("cartCount")).toHaveTextContent("2");
    });
    fireEvent.click(screen.getByTestId("decrementButton"));
    await waitFor(() => {
      expect(screen.getByTestId("cartCount")).toHaveTextContent("1");
      expect(updateCartItem).toHaveBeenCalledWith("1", 1);
    });
  });


  test("decrement does not go below 1", async () => {
    localStorage.setItem("token", "fake-token");
    renderComponent({ cart: { cart: [{ product_id: "1", quantityToBuy: 1 }] } });
    await waitFor(() => {
      expect(screen.getByTestId("cartCount")).toHaveTextContent("1");
    });
    fireEvent.click(screen.getByTestId("decrementButton"));
    await waitFor(() => {
      expect(screen.getByTestId("cartCount")).toHaveTextContent("1");
      expect(updateCartItem).not.toHaveBeenCalled();
    });
  });


  test("fetches and displays book reviews", async () => {
    (getBookReviews as jest.Mock).mockResolvedValue({ data: { success: true, result: [{ review: "Great book" }] } });
    renderComponent();
    await waitFor(() => {
      expect(getBookReviews).toHaveBeenCalledWith("1");
    });
  });


  test("handles review fetch failure", async () => {
    (getBookReviews as jest.Mock).mockRejectedValue(new Error("Fetch failed"));
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    renderComponent();
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Error in getting reviews", expect.any(Error));
    });
    consoleSpy.mockRestore();
  });


  test("initially shows wishlisted if book is in wishlist", () => {
    renderComponent({ wishList: { wishList: [bookDetails] } });
    expect(screen.getByText(/wishlisted/i)).toBeInTheDocument();
  });
});