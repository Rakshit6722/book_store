import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import AuthTemplate from '../components/Auth/AuthTemplate'
import { login, register } from '../api/userApi'
import { toast } from 'react-toastify'

jest.mock("../api/userApi", () => ({
    login: jest.fn(),
    register: jest.fn()
}))

const mockedNavigate = jest.fn()
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedNavigate
}))

jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}))

describe("AuthTemplate component tests", () => {

    const setLoading = jest.fn()
    const setFormData = jest.fn()

    test("component should render", () => {
        render(
            <MemoryRouter>
                <AuthTemplate container='login' />
            </MemoryRouter>
        )
        expect(screen.getByTestId(/image-text/i)).toBeInTheDocument()
        expect(screen.getByTestId(/login-link/i)).toBeInTheDocument()
        expect(screen.getByTestId(/register-link/i)).toBeInTheDocument()
    })

    test('should render login form if container is login and initially login form should be empty', () => {
        render(
            <MemoryRouter>
                <AuthTemplate container='login' />
            </MemoryRouter>
        )

        const emailInputField = screen.getByTestId(/login-email-input/i)
        const passwordInputField = screen.getByTestId(/login-password-input/i)

        expect(emailInputField).toBeInTheDocument()
        expect(passwordInputField).toBeInTheDocument()

        expect(emailInputField).toHaveValue("")
        expect(passwordInputField).toHaveValue("")
    })

    test("login component change event", () => {
        render(
            <MemoryRouter>
                <AuthTemplate container='login' />
            </MemoryRouter>
        )

        const emailInputField = screen.getByTestId(/login-email-input/i)
        const passwordInputField = screen.getByTestId(/login-password-input/i)

        expect(emailInputField).toHaveValue("")
        expect(passwordInputField).toHaveValue("")

        fireEvent.change(emailInputField, { target: { value: 'testuser' } })
        fireEvent.change(passwordInputField, { target: { value: 'testuserPass' } })

        expect(emailInputField).toHaveValue("testuser")
        expect(passwordInputField).toHaveValue("testuserPass")

    })

    test("should show error message when login form is submitted empty", async () => {
        render(
            <MemoryRouter>
                <AuthTemplate container='login' />
            </MemoryRouter>
        )

        const loginForm = screen.getByTestId(/form/i)

        fireEvent.submit(loginForm)

        expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument()
    })

    test("login form should submit properly", async () => {

        (login as jest.Mock).mockResolvedValue({ data: { success: true } })

        render(
            <MemoryRouter>
                <AuthTemplate container='login' />
            </MemoryRouter>
        )

        const loginForm = screen.getByTestId(/form/i)

        const emailInputField = screen.getByTestId(/login-email-input/i)
        const passwordInputField = screen.getByTestId(/login-password-input/i)

        fireEvent.change(emailInputField, { target: { value: 'testuser' } })
        fireEvent.change(passwordInputField, { target: { value: 'testuserPass' } })

        fireEvent.submit(loginForm)

        waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Login Success")
            expect(mockedNavigate).toHaveBeenCalledTimes(1)
            expect(setLoading).toHaveBeenCalled()
            expect(setFormData).toHaveBeenCalled()
            expect(emailInputField).toHaveValue("")
            expect(passwordInputField).toHaveValue("")
        })

    })

    test("should render register form when container is register", () => {
        render(
            <MemoryRouter>
                <AuthTemplate container='register' />
            </MemoryRouter>
        )

        const fullNameField = screen.getByTestId(/register-fullname/i)
        const emailField = screen.getByTestId(/register-email/i)
        const passwordField = screen.getByTestId(/register-password/i)
        const mobileNumberField = screen.getByTestId(/register-mobilenumber/i)

        expect(fullNameField).toBeInTheDocument()
        expect(emailField).toBeInTheDocument()
        expect(passwordField).toBeInTheDocument()
        expect(mobileNumberField).toBeInTheDocument()
    })

    test("initially register form fields should be empty", () => {
        render(
            <MemoryRouter>
                <AuthTemplate container='register' />
            </MemoryRouter>
        )

        const fullNameField = screen.getByTestId(/register-fullname/i)
        const emailField = screen.getByTestId(/register-email/i)
        const passwordField = screen.getByTestId(/register-password/i)
        const mobileNumberField = screen.getByTestId(/register-mobilenumber/i)

        expect(fullNameField).toHaveValue("")
        expect(passwordField).toHaveValue("")
        expect(emailField).toHaveValue("")
        expect(mobileNumberField).toHaveValue("")
    })

    test("register form fields change event", () => {
        render(
            <MemoryRouter>
                <AuthTemplate container='register' />
            </MemoryRouter>
        )

        const fullNameField = screen.getByTestId(/register-fullname/i)
        const emailField = screen.getByTestId(/register-email/i)
        const passwordField = screen.getByTestId(/register-password/i)
        const mobileNumberField = screen.getByTestId(/register-mobilenumber/i)

        fireEvent.change(fullNameField,{target:{value:"testUser"}})
        fireEvent.change(emailField,{target:{value:"testuser@gmail.com"}})
        fireEvent.change(passwordField,{target:{value:"Pass@123"}})
        fireEvent.change(mobileNumberField,{target:{value:"123456789"}})

        expect(fullNameField).toHaveValue("testUser")
        expect(emailField).toHaveValue("testuser@gmail.com")
        expect(passwordField).toHaveValue("Pass@123")
        expect(mobileNumberField).toHaveValue("123456789")
    })

    test("should show error messages if register form submitted empty", () => {
        render(
            <MemoryRouter>
                <AuthTemplate container='register' />
            </MemoryRouter>
        )

        const form = screen.getByTestId("form")
        fireEvent.submit(form)

        waitFor(() => {
            expect(screen.findByText(/full name is required/i))
            expect(screen.findByText(/email is required/i))
            expect(screen.findByText(/password is required/i))
            expect(screen.findByText(/mobile is required/i))
        })
    })

    test("filled register form should submit without any error", () => {
        (register as jest.Mock).mockResolvedValue({data: {result: "user"}})

        render(
            <MemoryRouter>
                <AuthTemplate container='register' />
            </MemoryRouter>
        )

        const fullNameField = screen.getByTestId(/register-fullname/i)
        const emailField = screen.getByTestId(/register-email/i)
        const passwordField = screen.getByTestId(/register-password/i)
        const mobileNumberField = screen.getByTestId(/register-mobilenumber/i)

        fireEvent.change(fullNameField,{target:{value:"testUser"}})
        fireEvent.change(emailField,{target:{value:"testuser@gmail.com"}})
        fireEvent.change(passwordField,{target:{value:"Pass@123"}})
        fireEvent.change(mobileNumberField,{target:{value:"123456789"}})

        const form = screen.getByTestId('form')
        fireEvent.submit(form)

        waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("User Created")
            expect(mockedNavigate).toHaveBeenNthCalledWith(1)
            expect(setLoading).toHaveBeenCalled()
            expect(setFormData).toHaveBeenCalled()
            expect(fullNameField).toHaveValue("")
            expect(emailField).toHaveValue("")
            expect(passwordField).toHaveValue("")
            expect(mobileNumberField).toHaveValue("")
        })
    })

    test("should show error message when login API fails", async () => {
        (login as jest.Mock).mockRejectedValue(new Error("Login Failed"))
    
        render(
            <MemoryRouter>
                <AuthTemplate container='login' />
            </MemoryRouter>
        )
    
        fireEvent.change(screen.getByTestId(/login-email-input/i), { target: { value: 'testuser' } })
        fireEvent.change(screen.getByTestId(/login-password-input/i), { target: { value: 'testuserPass' } })
        fireEvent.submit(screen.getByTestId(/form/i))
    
        waitFor(() => {
            expect(toast.error).toHaveBeenCalled()
        },{timeout: 3000})
    })

    test("should show error message when register API fails", async () => {
        (register as jest.Mock).mockRejectedValue(new Error("Registration Failed"));
    
        render(
            <MemoryRouter>
                <AuthTemplate container='register' />
            </MemoryRouter>
        );
    
        const fullNameField = screen.getByTestId(/register-fullname/i);
        const emailField = screen.getByTestId(/register-email/i);
        const passwordField = screen.getByTestId(/register-password/i);
        const mobileNumberField = screen.getByTestId(/register-mobilenumber/i);
    
        fireEvent.change(fullNameField, { target: { value: "testUser" } });
        fireEvent.change(emailField, { target: { value: "testuser@gmail.com" } });
        fireEvent.change(passwordField, { target: { value: "Pass@123" } });
        fireEvent.change(mobileNumberField, { target: { value: "1234567890" } }); // Ensure valid 10-digit number
    
        const form = screen.getByTestId("form");
        fireEvent.submit(form);
    
        waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Registration Failed");
            expect(mockedNavigate).not.toHaveBeenCalled(); 
        }, { timeout: 3000 });
    });

})