import React from "react";
import {cleanup, render} from "@testing-library/react";
import "../User/Users.scss";
import Child from "./Child";
import ChildNavi from "./ChildNavi";
import {MemoryRouter} from "react-router-dom";

describe("ChildNavi", () => {
    afterEach(cleanup);

    it("should render the sidebar, navbar, and Child components", () => {
        const {getByTestId} = render(<MemoryRouter>
            <ChildNavi/>
        </MemoryRouter>);

        expect(getByTestId("sidebar")).toBeTruthy();
        expect(getByTestId("navbar")).toBeTruthy();
        expect(getByTestId("child")).toBeTruthy();
    });

    it("should have a classname of 'users' on the main div", () => {
        const {container} = render(<MemoryRouter>
            <ChildNavi/>
        </MemoryRouter>);

        expect(container.firstChild.classList.contains('users')).toBe(true)
    });

    it("should have a classname of 'usersContainer' on the child div", () => {
        const {getByTestId} = render(<MemoryRouter>
            <ChildNavi/>
        </MemoryRouter>);

        expect(getByTestId("usersContainer").classList.contains('usersContainer')).toBe(true)
    });

    it("should render the Child component", () => {
        const {getByTestId} = render(<MemoryRouter>
            <Child/>
        </MemoryRouter>);

        expect(getByTestId("child")).toBeTruthy();
    });
});
