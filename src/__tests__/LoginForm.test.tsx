import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LoginForm from '../components/Auth/LoginForm';

jest.mock("../components/Auth/AuthTemplate", () => () => <div data-testid="authTemplate">Mocked AuthTemplate</div>)

describe('LoginForm Component', () => {
    
    test('renders correctly', () => {
        render(<LoginForm />);
        expect(screen.getByTestId('authTemplate')).toBeInTheDocument();
    });

    test('renders login form', () => {
        render(<LoginForm />);
        waitFor(() => {
            expect(screen.getByText(/Login/i)).toBeInTheDocument();
        })
    });
})