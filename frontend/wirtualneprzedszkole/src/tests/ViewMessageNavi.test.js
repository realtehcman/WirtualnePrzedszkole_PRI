import React from "react";
import {MemoryRouter} from "react-router-dom";
import {cleanup, render} from "@testing-library/react";
import ViewMessageNavi from "../pages/messages/ViewMessageNavi";

afterEach(cleanup);

describe('ViewMessageNavi component', () => {
    it('should render the component', () => {
        const { getByTestId } = render(<MemoryRouter><ViewMessageNavi /></MemoryRouter>);
        expect(getByTestId('view-message-navi')).toBeTruthy();
    });

    it('should render the Sidebar component', () => {
        const { getByTestId } = render(<MemoryRouter><ViewMessageNavi /></MemoryRouter>);
        expect(getByTestId('sidebar')).toBeTruthy();
    });

    it('should render the Navbar component', () => {
        const { getByTestId } = render(<MemoryRouter><ViewMessageNavi /></MemoryRouter>);
        expect(getByTestId('navbar')).toBeTruthy();
    });

    it('should render the StatusMessage component', () => {
        const { getByTestId } = render(<MemoryRouter><ViewMessageNavi /></MemoryRouter>);
        expect(getByTestId('view-message')).toBeTruthy();
    });
});
