import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Group from "../pages/GroupDisplay/Group";
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";

configure({adapter: new Adapter()});

describe('Group component', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <Group/>
            </MemoryRouter>
        );
        expect(getByTestId('group')).toBeTruthy();
    });
});
