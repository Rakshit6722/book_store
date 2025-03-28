import { render, screen } from "@testing-library/react"
import Breadcrumbs from "../components/Common/Breadcrumbs"
import React from "react"

describe("Breadcrumbs component tests", () => {
    test("component should render", () => {
        render(<Breadcrumbs/>)
        const homeOption = screen.getByText(/home/i)
        expect(homeOption).toBeInTheDocument()
    })

    test("should render book label when container is bookPage", () => {
        render(<Breadcrumbs container="bookPage"/>)
        const otherOption = screen.getByText(/book/i)
        expect(otherOption).toBeInTheDocument()
    })

    test("should render My Orders label when container is order", () => {
        render(<Breadcrumbs container="order"/>)
        expect(screen.getByText(/my orders/i)).toBeInTheDocument()
    })
    test("should render My Wishlist label when container is wishlist", () => {
        render(<Breadcrumbs container="wishlist"/>)
        expect(screen.getByText(/my wishlist/i)).toBeInTheDocument()
    })
    test("should render Profile when container is profile", () => {
        render(<Breadcrumbs container="profile"/>)
        expect(screen.getByText(/profile/i)).toBeInTheDocument()
    })
    test("should render My Cart label when container is cart", () => {
        render(<Breadcrumbs container="cart"/>)
        expect(screen.getByText(/my cart/i)).toBeInTheDocument()
    })

    const breadCrumbPaths = [
        {container:"bookPage", path:"/book", labelText:"Book"},
        {container:"order", path:"/myOrder", labelText:"My Orders"},
        {container:"wishlist", path:"/wishlist", labelText:"My Wishlist"},
        {container:"profile", path:"/profile", labelText:"Profile"},
        {container:"cart", path:"/cart", labelText:"My Cart"},
    ]

    test.each(breadCrumbPaths)(
        "should render correct path",
        ({container, path, labelText}) => {
            render(<Breadcrumbs container={container}/>)
            const linkElement = screen.getByText(labelText)
            expect(linkElement.closest('a')).toHaveAttribute("href",path)
        }
    )
})