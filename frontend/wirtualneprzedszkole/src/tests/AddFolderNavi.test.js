import React from "react";
import {configure} from "enzyme";
import AddFolderNavi from "../pages/Folders/AddFolderNavi";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";

configure({adapter: new Adapter()});

describe('AddFolderNavi component', () => {
    it('should render the component', () => {
        const { getByTestId } = render(<MemoryRouter><AddFolderNavi /></MemoryRouter>);
        expect(getByTestId('add-folder-navi')).toBeTruthy();
    });

    it('should render the Sidebar component', () => {
        const { getByTestId } = render(<MemoryRouter><AddFolderNavi /></MemoryRouter>);
        expect(getByTestId('sidebar')).toBeTruthy();
    });

    it('should render the Navbar component', () => {
        const { getByTestId } = render(<MemoryRouter><AddFolderNavi /></MemoryRouter>);
        expect(getByTestId('navbar')).toBeTruthy();
    });

    it('should render the StatusMessage component', () => {
        const { getByTestId } = render(<MemoryRouter><AddFolderNavi /></MemoryRouter>);
        expect(getByTestId('add-folder')).toBeTruthy();
    });
});
