import React from 'react';
import {configure} from 'enzyme';
import RestartPassword from '../pages/Login/RestartPassword';
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";

configure({adapter: new Adapter()});

jest.mock('../Home/CurrentUserService');

describe('RestartPassword component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <RestartPassword/>
            </MemoryRouter>
        );
        expect(getByTestId('restart-password')).toBeTruthy();
    });
});
