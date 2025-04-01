import React from "react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { fireEvent, queryByText, render, screen, waitFor } from "@testing-library/react";
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
  });

  test("component should render with book details", () => {
    renderComponent();

    expect(screen.getByText("testBook1")).toBeInTheDocument();
    expect(screen.getByText(/by testAuthor/i)).toBeInTheDocument(); 
    expect(screen.getByText("testDescription")).toBeInTheDocument();
    expect(screen.getByText("Rs. 1400")).toBeInTheDocument(); 
    expect(screen.getByText("2000")).toBeInTheDocument(); 
  });

//   test("initially wishlist button should render and should change to wishlisted upon clicking on it", async () => {
//     (addWishlist as jest.Mock).mockResolvedValue({ data: { message: "Item added to wish list" } });
  
//     localStorage.setItem("token", "fake-token");
  
//     renderComponent();
  
//     expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
  
//     fireEvent.click(screen.getByTestId("wishlist-button"));
  
//     await waitFor(() => {
//       expect(screen.getByText(/wishlisted/i)).toBeInTheDocument(); 
//       expect(screen.queryByText(/wishlist/i)).not.toBeInTheDocument();
//       expect(toast.success).toHaveBeenCalledWith("Item added to wishlist");
//     });
  
//     localStorage.removeItem("token"); 
//   });
  
  test("logged-out user cannot add to wishlist and sees login error", async () => {
  
    localStorage.clear(); 
  

    renderComponent();
  
    expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
  

    fireEvent.click(screen.getByTestId("wishlist-button"));
  
    
    await waitFor(() => {

      expect(toast.error).toHaveBeenCalledWith("Login first");
      expect(toast.error).toHaveBeenCalledTimes(1);
      expect(addWishlist).not.toHaveBeenCalled();

      expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
      expect(screen.queryByText(/wishlisted/i)).not.toBeInTheDocument();
    });
  });

  test("logged out user cannot add to cart", async () => {
    localStorage.clear()

    renderComponent()
    
    expect(screen.getByText(/add to bag/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/add to bag/i))

    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Login first")
        expect(toast.error).toHaveBeenCalledTimes(1)

        expect(screen.getByText(/add to bag/i)).toBeInTheDocument()
    })

  })

  test("add to bag button should render initially and changes to cart count upon clicking on it", () => {
    (addToTheCart as jest.Mock).mockResolvedValue({data:{success: true}})

    renderComponent()

    expect(screen.getByTestId(/addtocart-button/i)).toBeInTheDocument()

    fireEvent.click(screen.getByTestId(/addtocart-button/i))

    waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith("Item added to cart")
        expect(toast.success).toHaveBeenCalledTimes(1)

        expect(screen.queryByTestId(/addtocart/i)).not.toBeInTheDocument()
        expect(screen.findByTestId(/cartCount/i)).toBeInTheDocument()
        expect(screen.findByTestId(/incrementButton/i)).toBeInTheDocument()
        expect(screen.findByTestId(/decrementButton/i)).toBeInTheDocument()

    })
  })

  test("increment button should increase cart quantity", async () => {
    (addToTheCart as jest.Mock).mockResolvedValue({ data: { success: true } });
    (updateCartItem as jest.Mock).mockResolvedValue({ data: { success: true } });
  

    localStorage.setItem("token", "fake-token");
  

    renderComponent();

    fireEvent.click(screen.getByTestId("addToCart-button"));
  

    await waitFor(() => {
      expect(screen.getByTestId("incrementButton")).toBeInTheDocument();
      expect(screen.getByTestId("decrementButton")).toBeInTheDocument();
      expect(screen.getByTestId("cartCount")).toBeInTheDocument();
    });
  

    const quantityElement = screen.getByTestId("cartCount");
    expect(quantityElement).toHaveTextContent("1");
  

    fireEvent.click(screen.getByTestId("incrementButton"));
  

    await waitFor(() => {
      expect(quantityElement).toHaveTextContent("2");
      expect(updateCartItem).toHaveBeenCalledWith("1", 2); 
    });
  

    localStorage.removeItem("token");
  });

  test("decrement button should decrease cart quantity", async () => {
    // Mock API responses
    (addToTheCart as jest.Mock).mockResolvedValue({ data: { success: true } });
    (updateCartItem as jest.Mock).mockResolvedValue({ data: { success: true } });
  
    // Simulate a logged-in user
    localStorage.setItem("token", "fake-token");
  
    renderComponent({
      cart: { cart: [{ product_id: "1", quantityToBuy: 2 }] },
    });
  
   
    await waitFor(() => {
      expect(screen.getByTestId("incrementButton")).toBeInTheDocument();
      expect(screen.getByTestId("decrementButton")).toBeInTheDocument();
      expect(screen.getByTestId("cartCount")).toBeInTheDocument();
    });
  
    const quantityElement = screen.getByTestId("cartCount");
    expect(quantityElement).toHaveTextContent("2");
  
   
    fireEvent.click(screen.getByTestId("decrementButton"));
  

    await waitFor(() => {
      expect(quantityElement).toHaveTextContent("1");
      expect(updateCartItem).toHaveBeenCalledWith("1", 1);
    });
  
 
    localStorage.removeItem("token");
  });

});