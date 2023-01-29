import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import GaleriaNavi from "./GaleriaNavi";

describe('GaleriaNavi component', () => {
    it('should render the component', () => {
        const { getByTestId } = render(<MemoryRouter><GaleriaNavi /></MemoryRouter>);
        expect(getByTestId('galeria-navi')).toBeTruthy();
    });

    it('should render the Sidebar component', () => {
        const { getByTestId } = render(<MemoryRouter><GaleriaNavi /></MemoryRouter>);
        expect(getByTestId('sidebar')).toBeTruthy();
    });

    it('should render the Navbar component', () => {
        const { getByTestId } = render(<MemoryRouter><GaleriaNavi /></MemoryRouter>);
        expect(getByTestId('navbar')).toBeTruthy();
    });

    it('should render the StatusMessage component', () => {
        const { getByTestId } = render(<MemoryRouter><GaleriaNavi /></MemoryRouter>);
        expect(getByTestId('galeria')).toBeTruthy();
    });
});
