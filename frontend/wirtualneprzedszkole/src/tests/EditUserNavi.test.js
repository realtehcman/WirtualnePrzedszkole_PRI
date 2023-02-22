import React from "react";
import {configure, shallow} from "enzyme";
import EditUserNavi from "../pages/EditUser/EditUserNavi";
import EditUser from "../pages/EditUser/EditUser";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("<EditUserNavi />", () => {
    it("should render the component", () => {
        const wrapper = shallow(<EditUserNavi />);
        expect(wrapper.exists()).toBe(true);
    });

    it("should render the <EditUser /> component", () => {
        const wrapper = shallow(<EditUserNavi />);
        expect(wrapper.find(EditUser)).toHaveLength(1);
    });

});
