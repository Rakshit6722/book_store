import { fireEvent, render, screen } from "@testing-library/react"
import ProfileEditForm from "../components/Profile/ProfileEditForm"
import React from "react"

describe("Profile Edit Form component tests", () => {
    test("component should render", () => {
        render(<ProfileEditForm />)
        const heading = screen.getByText(/personal details/i)
        expect(heading).toBeInTheDocument()
    })

    test("form fields should render", () => {
        render(<ProfileEditForm />)

        const fullName = screen.getByTestId(/fullName/i)
        const email = screen.getByTestId(/email/i)
        const password = screen.getByTestId(/password/i)
        const mobileNumber = screen.getByTestId(/mobileNumber/i)

        expect(fullName).toBeInTheDocument()
        expect(email).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(mobileNumber).toBeInTheDocument()
    })

    test("form fields value change event", () => {
        render(<ProfileEditForm />)

        expect(screen.getByTestId(/fullName/i)).toHaveValue("John Doe")
        expect(screen.getByTestId(/email/i)).toHaveValue("john@example.com")
        expect(screen.getByTestId(/password/i)).toHaveValue("sadfasf")
        expect(screen.getByTestId(/mobileNumber/i)).toHaveValue("1234567890")

        fireEvent.change(screen.getByTestId(/fullName/i), { target: { value: "testUser" } })
        fireEvent.change(screen.getByTestId(/email/i), { target: { value: "testuser@gmail.com" } })
        fireEvent.change(screen.getByTestId(/password/i), { target: { value: "Pass@123" } })
        fireEvent.change(screen.getByTestId(/mobileNumber/i), { target: { value: "7505774522" } })

        expect(screen.getByTestId(/fullName/i)).toHaveValue("testUser")
        expect(screen.getByTestId(/email/i)).toHaveValue("testuser@gmail.com")
        expect(screen.getByTestId(/password/i)).toHaveValue("Pass@123")
        expect(screen.getByTestId(/mobileNumber/i)).toHaveValue("7505774522")
    })

    test("intially edit button renders and cancel button should not render", () => {
        render(<ProfileEditForm />)
        const editButton = screen.getByText(/edit/i)
        const cancelButton = screen.queryByText(/cancel/i)

        expect(editButton).toBeInTheDocument()
        expect(cancelButton).not.toBeInTheDocument()
    })

    test("initially all form fields should be disabled", () => {
        render(<ProfileEditForm />)

        const fullName = screen.getByTestId(/fullName/i)
        const email = screen.getByTestId(/email/i)
        const password = screen.getByTestId(/password/i)
        const mobileNumber = screen.getByTestId(/mobileNumber/i)

        expect(fullName).toBeDisabled()
        expect(email).toBeDisabled()
        expect(password).toBeDisabled()
        expect(mobileNumber).toBeDisabled()
    })

    test("form fields sohuld be enabled after clicking on edit", () => {
        render(<ProfileEditForm />)

        const editButton = screen.getByText(/edit/i)

        fireEvent.click(editButton)

        const fullName = screen.getByTestId(/fullName/i)
        const email = screen.getByTestId(/email/i)
        const password = screen.getByTestId(/password/i)
        const mobileNumber = screen.getByTestId(/mobileNumber/i)

        expect(fullName).toBeEnabled()
        expect(email).toBeEnabled()
        expect(password).toBeEnabled()
        expect(mobileNumber).toBeEnabled()

    })

    test("edit button should change to cancel button on clicking on it", () => {
        render(<ProfileEditForm />)

        const editButton = screen.getByText(/edit/i)

        expect(screen.queryByText(/cancel/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/save/i)).not.toBeInTheDocument();

        fireEvent.click(editButton)

        const cancelButton = screen.getByText(/cancel/i); 
        const saveButton = screen.getByText(/save/i); 

        expect(cancelButton).toBeInTheDocument(); 
        expect(saveButton).toBeInTheDocument(); 
        expect(screen.queryByText(/edit/i)).not.toBeInTheDocument();
    })
})