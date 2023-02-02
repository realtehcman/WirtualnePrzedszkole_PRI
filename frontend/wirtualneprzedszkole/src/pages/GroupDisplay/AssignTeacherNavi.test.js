import React from 'react';
import {configure, shallow} from 'enzyme';
import AssignTeacherNavi from './AssignTeacherNavi';
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe('AssignTeacherNavi', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<AssignTeacherNavi />);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render the Sidebar component', () => {
        const wrapper = shallow(<AssignTeacherNavi />);
        expect(wrapper.find('Sidebar').exists()).toBe(true);
    });

    it('should render the Navbar component', () => {
        const wrapper = shallow(<AssignTeacherNavi />);
        expect(wrapper.find('Navbar').exists()).toBe(true);
    });

    it('should render the AssignTeacher component', () => {
        const wrapper = shallow(<AssignTeacherNavi />);
        expect(wrapper.find('AssignTeacher').exists()).toBe(true);
    });

});
