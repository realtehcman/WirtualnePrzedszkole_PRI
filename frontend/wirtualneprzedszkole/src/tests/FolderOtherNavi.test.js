import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import FolderOtherNavi from "../pages/Folders/FolderOtherNavi";

describe("FolderOtherNavi component", () => {

    it("should render a FolderOther component with passed props", () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <FolderOtherNavi/>
            </MemoryRouter>
        );
        expect(getByTestId("folder-other-navi")).toBeTruthy();
    });
});
