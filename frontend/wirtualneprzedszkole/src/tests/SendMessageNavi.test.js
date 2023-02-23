import {cleanup, render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import SendMessageNavi from "../pages/messages/SendMessageNavi";
import React from "react";

afterEach(cleanup);

describe('SendMessageNavi component', () => {
    it('should render the component', () => {
        const { getByTestId } = render(<MemoryRouter><SendMessageNavi /></MemoryRouter>);
        expect(getByTestId('send-message-navi')).toBeTruthy();
    });

    it('should render the Sidebar component', () => {
        const { getByTestId } = render(<MemoryRouter><SendMessageNavi /></MemoryRouter>);
        expect(getByTestId('sidebar')).toBeTruthy();
    });

    it('should render the Navbar component', () => {
        const { getByTestId } = render(<MemoryRouter><SendMessageNavi /></MemoryRouter>);
        expect(getByTestId('navbar')).toBeTruthy();
    });

    it('should render the StatusMessage component', () => {
        const { getByTestId } = render(<MemoryRouter><SendMessageNavi /></MemoryRouter>);
        expect(getByTestId('send-message-navi')).toBeTruthy();
    });
});
