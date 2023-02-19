import React from "react";
import {cleanup, render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserNavi from "../pages/User/UserNavi";
import {MemoryRouter} from "react-router-dom";

afterEach(cleanup);

describe("UserNavi component", () => {
    test("should render correctly", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <UserNavi />
            </MemoryRouter>
        );
        expect(getByTestId("users")).toBeTruthy();
        expect(getByTestId("sidebar")).toBeTruthy();
        expect(getByTestId("navbar")).toBeTruthy();
    });

});
