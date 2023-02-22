import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import GroupNavi from "../pages/GroupDisplay/GroupNavi";

describe('GroupNavo component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <GroupNavi/>
            </MemoryRouter>
        );
        expect(getByTestId('group-navi')).toBeTruthy();
        expect(getByTestId('group-navi-button')).toBeTruthy();
    });
});
