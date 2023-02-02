import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Navbar from "./Navbar";
import LoginService from "../../pages/Login/LoginService.js"
import {MemoryRouter} from "react-router-dom";

jest.mock("../../pages/Login/LoginService.js")

describe("Navbar", () => {
    it("should render the logout button", () => {
        const {getByText} = render(
            <MemoryRouter>
                <Navbar/>
            </MemoryRouter>
        );
        const logoutButton = getByText("Wyloguj się");
        expect(logoutButton).toBeTruthy();
    });

    it("should call the logout function when the logout button is clicked", async () => {
        const logoutFn = jest.fn();
        LoginService.logout.mockResolvedValue(logoutFn);
        const {getByText} = render(<MemoryRouter>
                <Navbar/>
            </MemoryRouter>
        );
        const logoutButton = getByText("Wyloguj się");
        fireEvent.click(logoutButton);
        expect(LoginService.logout).toHaveBeenCalled();
    });

});
