import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CartSection from "../components/Cart/CartSection";
import { removeCartItem, updateCartItem } from "../api/bookApi";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../api/bookApi", () => ({
  removeCartItem: jest.fn(),
  updateCartItem: jest.fn(),
}));

const mockStore = configureStore([]);

describe("CartSection Component", () => {
  const book = {
    _id: "12345",
    bookName: "Test Book",
    author: "Test Author",
    price: 100,
    discountPrice: 80,
    cover: "test_cover.jpg",
  };

  const product_id = "12345";
  const getCartItems = jest.fn();

  let store: any;

  beforeEach(() => {
    store = mockStore({
      cart: { cart: [{ _id: "12345", quantityToBuy: 2, product_id: "12345" }] }, // Initial cart state
    });
    store.dispatch = jest.fn();
    jest.clearAllMocks();
  });

  const renderComponent = (customStore = store) => {
    return render(
      <Provider store={customStore}>
        <CartSection book={book} product_id={product_id} getCartItems={getCartItems} />
      </Provider>
    );
  };

  test("renders book details correctly", () => {
    renderComponent();
    expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Author/i)).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument(); 
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByAltText("book-image")).toBeInTheDocument();
  });

  test("renders cart count, increment, and decrement buttons", () => {
    renderComponent();
    expect(screen.getByTestId("Increment")).toBeInTheDocument();
    expect(screen.getByTestId("Decrement")).toBeInTheDocument();
    expect(screen.getByTestId("CartCount")).toHaveTextContent("2"); 
  });

  test("renders remove button", () => {
    renderComponent();
    expect(screen.getByText(/Remove/i)).toBeInTheDocument();
  });

  test("removes item from cart when remove button is clicked", async () => {
    (removeCartItem as jest.Mock).mockResolvedValue({ data: { success: true } });
    renderComponent();
    fireEvent.click(screen.getByText(/Remove/i));
    await waitFor(() => {
      expect(removeCartItem).toHaveBeenCalledWith(product_id);
      expect(getCartItems).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Item removed from cart");
      expect(store.dispatch).toHaveBeenCalledWith({ type: "cart/removeFromCart", payload: product_id });
    });
  });

  test("increments cart count when increment button is clicked", async () => {
    (updateCartItem as jest.Mock).mockResolvedValue({ data: { success: true } });
    renderComponent();
    expect(screen.getByTestId("CartCount")).toHaveTextContent("2");
    fireEvent.click(screen.getByTestId("Increment"));
    await waitFor(() => {
      expect(updateCartItem).toHaveBeenCalledWith(book._id, 3);
      expect(store.dispatch).toHaveBeenCalledWith({ type: "cart/incrementQuantity", payload: product_id });
      expect(screen.getByTestId("CartCount")).toHaveTextContent("3");
    });
  });

  test("decrements cart count when decrement button is clicked and count > 1", async () => {
    (updateCartItem as jest.Mock).mockResolvedValue({ data: { success: true } });
    renderComponent();
    expect(screen.getByTestId("CartCount")).toHaveTextContent("2");
    fireEvent.click(screen.getByTestId("Decrement"));
    await waitFor(() => {
      expect(updateCartItem).toHaveBeenCalledWith(book._id, 1);
      expect(store.dispatch).toHaveBeenCalledWith({ type: "cart/decrementQuantity", payload: product_id });
      expect(screen.getByTestId("CartCount")).toHaveTextContent("1");
    });
  });

  test("does not decrement cart count below 1", async () => {
    store = mockStore({
      cart: { cart: [{ _id: "12345", quantityToBuy: 1, product_id: "12345" }] },
    });
    store.dispatch = jest.fn();
    renderComponent(store);
    expect(screen.getByTestId("CartCount")).toHaveTextContent("1");
    fireEvent.click(screen.getByTestId("Decrement"));
    await waitFor(() => {
      expect(updateCartItem).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(screen.getByTestId("CartCount")).toHaveTextContent("1");
    });
  });

  test("handles API error on increment", async () => {
    (updateCartItem as jest.Mock).mockRejectedValue(new Error("Update failed"));
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    renderComponent();
    fireEvent.click(screen.getByTestId("Increment"));
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Error in updating cart", expect.any(Error));
      expect(screen.getByTestId("CartCount")).toHaveTextContent("3"); 
    });
    consoleSpy.mockRestore();
  });

  test("handles API error on remove", async () => {
    (removeCartItem as jest.Mock).mockRejectedValue(new Error("Remove failed"));
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    renderComponent();
    fireEvent.click(screen.getByText(/Remove/i));
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Error in removing from cart", expect.any(Error));
      expect(toast.success).not.toHaveBeenCalled();
    });
    consoleSpy.mockRestore();
  });
});