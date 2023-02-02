import React from "react";
import {configure, shallow} from "enzyme";
import EditUser from "./EditUser";
import Adapter from "enzyme-adapter-react-16";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

configure({adapter: new Adapter()});

describe("<EditUser />", () => {
    it("should render the component", () => {
        const wrapper = shallow(<EditUser />);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <EditUser/>
            </MemoryRouter>
        );
        expect(getByTestId('edit-user')).toBeTruthy();
    });


});
