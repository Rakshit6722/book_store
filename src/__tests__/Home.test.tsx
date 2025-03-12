import Home from "../pages/Home"
import { render, screen } from "@testing-library/react"
import { vi, describe, test, expect } from "vitest"; 

vi.mock('../components/Common/Header', () => ({
    default: () => <div data-testid="header">Header</div>
}
))

vi.mock('../components/BookContainer/BookContainer', () => ({
    default: () => <div data-testid="bookContainer">BookContainer</div>
}
))

vi.mock('../components/Common/Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}
))

describe("Home page render", () => {
    test("renders Header, BookContainer, and Footer", () => {
        render(<Home />)

        expect(screen.getByTestId("header")).toBeInTheDocument()
        expect(screen.getByTestId("bookContainer")).toBeInTheDocument()
        expect(screen.getByTestId("footer")).toBeInTheDocument()
    })
})