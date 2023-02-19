import React from 'react';
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StatusMessageNavi from '../pages/messages/StatusMessageNavi';
import {MemoryRouter} from "react-router-dom";

afterEach(cleanup);

describe('StatusMessageNavi component', () => {
    it('should render the component', () => {
        const { getByTestId } = render(<MemoryRouter><StatusMessageNavi /></MemoryRouter>);
        expect(getByTestId('status-message-navi')).toBeInTheDocument();
    });

    it('should render the Sidebar component', () => {
        const { getByTestId } = render(<MemoryRouter><StatusMessageNavi /></MemoryRouter>);
        expect(getByTestId('sidebar')).toBeInTheDocument();
    });

    it('should render the Navbar component', () => {
        const { getByTestId } = render(<MemoryRouter><StatusMessageNavi /></MemoryRouter>);
        expect(getByTestId('navbar')).toBeInTheDocument();
    });

    it('should render the StatusMessage component', () => {
        const { getByTestId } = render(<MemoryRouter><StatusMessageNavi /></MemoryRouter>);
        expect(getByTestId('status-message')).toBeInTheDocument();
    });
});
