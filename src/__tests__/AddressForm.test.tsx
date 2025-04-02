import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import AddressForm from '../components/Profile/AddressForm'

describe("AddressForm Component", () => {
    test("renders correctly", () => {
        render(
            <AddressForm/>
        )

        expect(screen.getByText(/Address Details/i)).toBeInTheDocument()
    })

    test("renders add new address button", () => {
        render(
            <AddressForm/>
        )

        expect(screen.getByText(/Add New Address/i)).toBeInTheDocument()
    })

    test("renders address list", () => {
        render(
            <AddressForm/>
        )

        waitFor(() => {
            expect(screen.getByText(/Home/i)).toBeInTheDocument()
        })
    })
    test("renders address list with correct address", () => {
        render(
            <AddressForm/>
        )
        waitFor(() => {
            expect(screen.getByText(/1234 Main St/i)).toBeInTheDocument()
        })
    })
})
