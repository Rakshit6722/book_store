import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Common/Header";
import React from "react";
import SearchProvider from "../context/SearchProvider";

jest.mock("../components/Common/ProfileDropdown", () => (props: any) => {
  return (
    <div data-testid="profile-dropdown">
      <button onClick={props.logout} data-testid="logout-button">Logout</button>
    </div>
  );
});


const mockStore = configureStore([]);
const store = mockStore({
  cart: { cart: [] },
  wishList: { wishList: [] },
  user: { isAuthenticated: false },
});
store.dispatch = jest.fn();

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

describe("Header Component Tests", () => {

  test("should render properly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header container="home" />
        </MemoryRouter>
      </Provider>
    );

    const bookStoreText = screen.getByText(/bookstore/i);
    expect(bookStoreText).toBeInTheDocument();
  });


  test("should not render search and cart icons if container is not provided", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    )

    const searchBar = screen.queryByPlaceholderText(/search.../i)
    const cart = screen.queryByText(/cart/i)
    const profile = screen.queryByText(/profile/i)

    expect(searchBar).not.toBeInTheDocument()
    expect(cart).not.toBeInTheDocument()
    expect(profile).not.toBeInTheDocument()
  })

  test("search bar change event", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchProvider>
            <Header container="home" />
          </SearchProvider>
        </MemoryRouter>
      </Provider>
    )

    const searchInput = screen.getByPlaceholderText(/search/i)

    fireEvent.change(searchInput, { target: { value: "random value" } })

    expect(searchInput).toHaveValue('random value')
  })

  test("user should be logged out when clicking on logout button", async () => {
    localStorage.setItem("token", "test_token");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchProvider>
            <Header container="home" />
          </SearchProvider>
        </MemoryRouter>
      </Provider>
    );


    const profileButton = screen.getByTestId("profile-dropdown");
    fireEvent.click(profileButton);


    const logoutButton = await screen.findByTestId("logout-button");
    fireEvent.click(logoutButton);

    waitFor(() => {
      expect(localStorage.removeItem).toHaveBeenCalledWith("token");
      expect(localStorage.getItem("token")).toBeNull();
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  })
})
