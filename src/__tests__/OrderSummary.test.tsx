import { render, screen } from "@testing-library/react";
import React from "react";
import OrderSummary from "../components/Cart/OrderSummary";

describe("Order Summary component", () => {
    beforeAll(() => {
        jest.spyOn(console, "log").mockImplementation(() => { });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    const book = {
        name: "Book 1",
        author: "Author 1",
        discountPrice: 100,
        price: 200,
        cover: "https://example.com/book-cover.jpg"
    };

    test("renders correctly", () => {
        render(<OrderSummary book={book} />);
        expect(screen.getByTestId(/orderSummary-div/i)).toBeInTheDocument();
    });

    test("renders book data", () => {
        render(<OrderSummary book={book} />);
        expect(screen.getByText(/Book 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
    });

    test("renders book image correctly", () => {
        render(<OrderSummary book={book} />);
        const image = screen.getByRole("img", { name: /book-image/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", book.cover);
    });

    test("displays correct pricing", () => {
        render(<OrderSummary book={book} />);
        expect(screen.getByText(/Rs. 100/i)).toBeInTheDocument();
        expect(screen.getByText(/200/i)).toBeInTheDocument();
    });

    test("applies correct styling classes", () => {
        render(<OrderSummary book={book} />);
        const container = screen.getByTestId("orderSummary-div");
        expect(container).toHaveClass("flex flex-row gap-2 mt-4");
    });
});
