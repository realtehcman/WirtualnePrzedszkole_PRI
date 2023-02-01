import {cleanup, render} from "@testing-library/react";
import React from "react";
import FolderNavi from "./FolderNavi";
import {MemoryRouter} from "react-router-dom";

afterEach(cleanup);

describe("<FolderNavi />", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <FolderNavi />
            </MemoryRouter>
        );
    });

    it("renders the correct components", () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <FolderNavi />
            </MemoryRouter>
        );
        expect(getByTestId("sidebar")).toBeTruthy();
        expect(getByTestId("navbar")).toBeTruthy();
        expect(getByTestId("folders")).toBeTruthy();
    });

});
