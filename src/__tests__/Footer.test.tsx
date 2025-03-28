import { render, screen } from "@testing-library/react"
import Footer from "../components/Common/Footer"
import React from "react"

describe("Footer Component Test", () => {
    test("should render properly", () => {
        render(<Footer/>)
        const footerText = screen.getByText(/Copyright/i)
        expect(footerText).toBeInTheDocument()
    })
})