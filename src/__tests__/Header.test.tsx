import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Common/Header";
import React from "react";

const mockStore = configureStore([]);
const store = mockStore({
  cart: { cart: [] },
  wishList: { wishList: [] },
  user: { isAuthenticated: false },
});

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
});