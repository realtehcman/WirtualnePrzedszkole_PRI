import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import ViewMessage from "../pages/messages/ViewMessage";

describe('ViewMessage component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <ViewMessage/>
            </MemoryRouter>
        );
        expect(getByTestId('view-message')).toBeTruthy();
    });
});
