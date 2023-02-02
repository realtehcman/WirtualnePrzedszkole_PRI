import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import Galeria from "./Galeria";

describe('Galeria component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <Galeria/>
            </MemoryRouter>
        );
        expect(getByTestId('galeria')).toBeTruthy();
    });
});
