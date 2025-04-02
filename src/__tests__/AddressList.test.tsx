import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import AddressList from '../components/Profile/AddressList';

describe('AddressList Component', () => {

    const address = {
        address: "1234 Main St",
        city: "San Francisco",
        state: "CA",
        type: "Home",
    }

    const index = 0;
    const setAddressEdit = jest.fn()    
    const setAddressData = jest.fn()

    test('renders correctly',() => {
        render(
            <AddressList address={address} index={index} />
        )

        expect(screen.getByText(/1. Home/i)).toBeInTheDocument()
    })

    test("renders address data with correct address", () => {
        render(
            <AddressList address={address} index={index} />
        )
        waitFor(() => {
            expect(screen.getByText(/1234 Main St/i)).toBeInTheDocument()
            expect(screen.getByText(/San Francisco/i)).toBeInTheDocument()
            expect(screen.getByText(/CA/i)).toBeInTheDocument()
            expect(screen.getByText(/Home/i)).toBeInTheDocument()
        })
    })

    test("renders edit button on initial render", () => {
        render(
            <AddressList address={address} index={index} />
        )
        expect(screen.getByText(/Edit/i)).toBeInTheDocument()
    })

    test("renders cancel button and save button when edit button is clicked", async () => {
        render(
            <AddressList address={address} index={index} />
        )
        const editButton = screen.getByText(/Edit/i);
        editButton.click()
        expect(await screen.findByText(/Cancel/i)).toBeInTheDocument()
        expect(await screen.findByText(/SAVE/i)).toBeInTheDocument()
    })

    test("renders address input field", () => {
        render(
            <AddressList address={address} index={index} />
        )
        waitFor(() => {
            expect(screen.getByLabelText(/Address/i)).toBeInTheDocument()
            expect(screen.getByRole('textbox', { name: /Address/i })).toBeInTheDocument()
            expect(screen.getByTestId(/address-city/i)).toBeInTheDocument()
            expect(screen.getByTestId(/address-state/i)).toBeInTheDocument()
            expect(screen.getAllByTestId(/address-type/i)).toBeInTheDocument()
        })
    })

    test("renders address input field with correct data", () => {
        render(
            <AddressList address={address} index={index} />
        )
        waitFor(() => {
            expect(screen.getByLabelText(/Address/i)).toHaveValue(address.address)
            expect(screen.getByTestId(/address-city/i)).toHaveValue(address.city)
            expect(screen.getByTestId(/address-state/i)).toHaveValue(address.state)
            expect(screen.getByTestId(/address-type/i)).toHaveValue(address.type)
        })
    })

    test("intially input fields are disabled", () => {
        render(
            <AddressList address={address} index={index} />
        )
        expect(screen.getByLabelText(/Address/i)).toBeDisabled()
        expect(screen.getByTestId(/address-city/i)).toBeDisabled()
        expect(screen.getByTestId(/address-state/i)).toBeDisabled()
    })

    test("input fields are enabled when edit button is clicked", () => {
        render(
            <AddressList address={address} index={index} />
        )
        const editButton = screen.getByText(/Edit/i);
        editButton.click()
        waitFor(() => {
            expect(screen.getByLabelText(/Address/i)).toBeEnabled()
            expect(screen.getByTestId(/address-city/i)).toBeEnabled()
            expect(screen.getByTestId(/address-state/i)).toBeEnabled()
        })
    })

})