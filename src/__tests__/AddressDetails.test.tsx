import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddressDetails from '../components/Cart/AddressDetails';


const mockSetOrderSummary = jest.fn();

describe('AddressDetails Component', () => {
    beforeEach(() => {
        render(<AddressDetails orderSummary={false} setOrderSummary={mockSetOrderSummary} />);
    });

    test('renders customer details section', () => {
        expect(screen.getByText(/Customer Details/i)).toBeInTheDocument();
    });

    test('renders input fields for full name and mobile number', () => {
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    });

    test('clicking on Add New Address button displays new address form', () => {
        const addNewAddressButton = screen.getByText(/Add New Address/i);
        fireEvent.click(addNewAddressButton);
        waitFor(() => {
            expect(screen.getByText(/New Address/i)).toBeInTheDocument();
        })
    });

    test('entering new address details updates input fields', () => {
        const addNewAddressButton = screen.getByText(/Add New Address/i);
        fireEvent.click(addNewAddressButton);
        
        const addressInput = screen.getByLabelText(/Address/i);
        fireEvent.change(addressInput, { target: { value: '123 Test Street' } });
        expect(addressInput).toHaveValue('123 Test Street');
    });

    test('selecting an address updates the selected address', () => {
        const radioButtons = screen.getAllByRole('radio', { name: /Home|Work/i });
        fireEvent.click(radioButtons[1]); 
        expect(radioButtons[1]).toBeChecked();
    });

    test('clicking Continue button calls setOrderSummary', () => {
        const continueButton = screen.getByTestId('addressContinue-button');
        fireEvent.click(continueButton);
        expect(mockSetOrderSummary).toHaveBeenCalledWith(true);
    });
});
