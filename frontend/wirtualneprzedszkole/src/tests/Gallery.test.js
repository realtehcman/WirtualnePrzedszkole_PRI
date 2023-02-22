import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import Gallery from "../pages/gallery/Gallery";

describe('Gallery component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <Gallery/>
            </MemoryRouter>
        );
        expect(getByTestId('gallery')).toBeTruthy();
    });
});
