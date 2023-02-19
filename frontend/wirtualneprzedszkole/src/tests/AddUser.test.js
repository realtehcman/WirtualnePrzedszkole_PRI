import React from 'react';
import {configure, shallow} from 'enzyme';
import AddUser from '../pages/CreateUser/AddUser';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import CreateUser from '../pages/CreateUser/CreateUser';
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe('AddUser component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<AddUser />);
    });

    it('should render the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should render the Sidebar component', () => {
        expect(wrapper.find(Sidebar).exists()).toBe(true);
    });

    it('should render the Navbar component', () => {
        expect(wrapper.find(Navbar).exists()).toBe(true);
    });

    it('should render the CreateUser component', () => {
        expect(wrapper.find(CreateUser).exists()).toBe(true);
    });
});
