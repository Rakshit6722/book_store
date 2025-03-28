import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Placeholder from "../components/Common/Placeholder";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);
const store = mockStore({
  cart: { cart: [] },
  wishList: { wishList: [] },
});

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Placeholder Component tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test("component should render", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Placeholder />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/please log in/i)).toBeInTheDocument();
  });

  test("login button should call navigate function", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Placeholder />
        </MemoryRouter>
      </Provider>
    );

    const loginButton = screen.getByText(/login\/signup/i); 

    fireEvent.click(loginButton);

 
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("/login");
  });
});
