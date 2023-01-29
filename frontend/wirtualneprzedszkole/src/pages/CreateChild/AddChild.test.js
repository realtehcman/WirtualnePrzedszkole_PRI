import React from "react";
import {configure, shallow} from "enzyme";
import AddChild from "./AddChild";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import CreateChild from "./CreateChild";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("AddChild component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AddChild />);
    });

    test("renders a Sidebar component", () => {
        expect(wrapper.find(Sidebar)).toHaveLength(1);
    });

    test("renders a Navbar component", () => {
        expect(wrapper.find(Navbar)).toHaveLength(1);
    });

    test("renders a CreateChild component", () => {
        expect(wrapper.find(CreateChild)).toHaveLength(1);
    });

    test("renders a div with class name 'addusersContainer'", () => {
        expect(wrapper.find("div.addusersContainer")).toHaveLength(1);
    });

    test("renders a div with class name 'addusers'", () => {
        expect(wrapper.find("div.addusers")).toHaveLength(1);
    });
});
