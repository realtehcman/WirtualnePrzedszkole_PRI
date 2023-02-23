import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import CurrentUser from "../pages/Home/CurrentUser";

describe('CurrentUser component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <CurrentUser/>
            </MemoryRouter>
        );
        expect(getByTestId('sidebar')).toBeTruthy();
        expect(getByTestId('navbar')).toBeTruthy();
    });
});
