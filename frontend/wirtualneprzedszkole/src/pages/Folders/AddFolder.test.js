import React from 'react'
import {configure} from 'enzyme'
import AddFolder from './AddFolder'
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";

configure({adapter: new Adapter()});

jest.mock('./FolderService')
jest.mock("../gallery/FileService")

describe('AddFolder component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <AddFolder/>
            </MemoryRouter>
        );
        expect(getByTestId('add-folder')).toBeTruthy();
    });
});
