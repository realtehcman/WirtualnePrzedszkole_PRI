import React from 'react';
import {configure} from 'enzyme';
import ChangePassword from './ChangePassword';
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";

jest.mock('../Home/CurrentUserService');
configure({adapter: new Adapter()});

describe('ChangePassword component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <ChangePassword/>
            </MemoryRouter>
        );
        expect(getByTestId('change-password')).toBeTruthy();
    });
});
