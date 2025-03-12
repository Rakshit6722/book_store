import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import AuthTemplate from "../components/Auth/AuthTemplate"
import { MemoryRouter } from "react-router-dom"

describe("AuthTemplate component render", () => {
    test("renders login authTemplate component", () => {
        render(<MemoryRouter>
            <AuthTemplate container="login" />
        </MemoryRouter>)

        expect(screen.getByText("LOGIN")).toBeInTheDocument();
        expect(screen.getByText("SIGNUP")).toBeInTheDocument();
        expect(screen.getByLabelText("Email Id")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByText("Forget Password?")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    })

    test(("renders signup authTemplate component"), () => {
        render(<MemoryRouter>
            <AuthTemplate container="register" />
        </MemoryRouter>)

        expect(screen.getByText("LOGIN")).toBeInTheDocument();
        expect(screen.getByText("SIGNUP")).toBeInTheDocument();
        expect(screen.getByLabelText("Email Id")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Mobile Number")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Signup" })).toBeInTheDocument();
    })

    test("password toggle functionality", async () => {
        render(
            <MemoryRouter>
                <AuthTemplate container="register" />
            </MemoryRouter>
        )

        const toggleButton = screen.getByTestId("togglePassword")
        const passwordInput = screen.getByLabelText("Password")

        expect(passwordInput).toHaveAttribute("type", "password")

        fireEvent.click(toggleButton)
        await waitFor(() => {
            screen.debug()  
            expect(passwordInput).toHaveAttribute("type", "text")
         })

        // fireEvent.click(toggleButton)
        // await waitFor(() => {
        //     screen.debug() 
        //     expect(passwordInput).toHaveAttribute("type", "password")
        // })
    })
})