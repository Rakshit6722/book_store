import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("../components/Auth/AuthTemplate",() => () => <div data-testid="authTemplate">Mocked AuthTemplate</div>)

describe("RegisterForm Component", () => {
    test("renders correctly", () => {
        render(<RegisterForm />);
        expect(screen.getByTestId("authTemplate")).toBeInTheDocument();
    });

    test("renders register form", () => {
        render(<RegisterForm />);
        waitFor(() => {
            expect(screen.getByText(/Register/i)).toBeInTheDocument();
        })
    });
})