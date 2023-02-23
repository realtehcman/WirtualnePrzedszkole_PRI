import React from "react";
import {configure, shallow} from "enzyme";
import Login from "../pages/Login/Login";
import LoginPage from "../pages/Login/LoginPage";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("Login", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Login />);
    });

    it("should render a div with class 'login'", () => {
        expect(wrapper.find(".login").length).toEqual(1);
    });

    it("should render a div with class 'loginContainer'", () => {
        expect(wrapper.find(".loginContainer").length).toEqual(1);
    });

    it("should render the LoginPage component", () => {
        expect(wrapper.find(LoginPage).length).toEqual(1);
    });
});
