import React from "react";
import { render, screen, fireEvent, findByText, waitFor } from "@testing-library/react";
import ProfileDropdown from "../components/Common/ProfileDropdown";
import { MemoryRouter } from "react-router-dom";

describe("ProfileDropdown Component", () => {

    beforeEach(() => {
        localStorage.clear()
    })

    const mockLogout = jest.fn()

    test("opens dropdown when profile icon is clicked and login/signup button should be rendered", async () => {

        render(
            <MemoryRouter>
                <ProfileDropdown logout={mockLogout} />
            </MemoryRouter>);


        fireEvent.click(screen.getByTestId("profile-icon"));
        expect(await screen.findByText("To access account and manage orders")).toBeInTheDocument();
        expect(await screen.findByText(/login/i)).toBeInTheDocument()
    });

    test("shows logged in content in dropdown when user is logged in", async () => {
        localStorage.setItem('name', 'testUser')

        render(
            <MemoryRouter>
                <ProfileDropdown logout={mockLogout} />
            </MemoryRouter>);

        expect(screen.getByText(/testuser/i)).toBeInTheDocument()

        fireEvent.click(screen.getByTestId("profile-icon"))

        expect(await screen.findByText(/Profile/i)).toBeInTheDocument()
        expect(await screen.findByText(/my orders/i)).toBeInTheDocument()
        expect(await screen.findByText(/my wishlist/i)).toBeInTheDocument()

    })

    test("changes dropdown content on clicking on logout", async () => {
        localStorage.setItem('name', 'testUser')

        render(
            <MemoryRouter>
                <ProfileDropdown logout={mockLogout} />
            </MemoryRouter>);

        expect(screen.getByText(/testuser/i)).toBeInTheDocument()

        fireEvent.click(screen.getByTestId("profile-icon"))

        const logoutButton = await screen.findByTestId(/logout-button/i)

        fireEvent.click(logoutButton)

        waitFor(() => {
            expect(screen.queryByText(/testuser/i)).not.toBeInTheDocument()
        })
    })

});
