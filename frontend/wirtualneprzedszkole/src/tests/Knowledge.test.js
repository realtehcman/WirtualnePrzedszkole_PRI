import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import Knowledge from "../pages/gallery/Knowledge";

describe('Knowledge component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <Knowledge/>
            </MemoryRouter>
        );
        expect(getByTestId('knowledge')).toBeTruthy();
    });
});
