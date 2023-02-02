import React from 'react';
import {configure, shallow} from 'enzyme';
import LoginPage from './LoginPage';
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";

jest.mock('./LoginService');
configure({adapter: new Adapter()});

describe('LoginPage', () => {
    let wrapper;
    let emailInput;
    let passwordInput;
    let loginBtn;
    let resetPasswordBtn;
    let navigateMock;

    beforeEach(() => {
        navigateMock = jest.fn();
        wrapper = shallow(<MemoryRouter> <LoginPage /></MemoryRouter>);
        emailInput = wrapper.find('input[name="Email"]');
        passwordInput = wrapper.find('input[name="Password"]');
        loginBtn = wrapper.find('button').at(0);
        resetPasswordBtn = wrapper.find('button').at(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render email and password inputs', () => {
        expect(emailInput.exists()).toBe(false);
        expect(passwordInput.exists()).toBe(false);
    });

    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        );
        expect(getByTestId('login')).toBeTruthy();
    });


});
