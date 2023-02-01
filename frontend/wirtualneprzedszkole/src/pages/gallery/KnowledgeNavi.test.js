import React from 'react';
import {configure, shallow} from 'enzyme';
import KnowledgeNavi from './KnowledgeNavi';
import Sidebar from '../../components/sidebar/sidebar';
import Navbar from '../../components/navbar/navbar';
import Knowledge from './Knowledge';
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe('KnowledgeNavi', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<KnowledgeNavi />);
    });

    it('should render a div with class "users gallery"', () => {
        expect(wrapper.find('.users.gallery').length).toBe(1);
    });

    it('should render the Sidebar component', () => {
        expect(wrapper.find(Sidebar).length).toBe(1);
    });

    it('should render a div with class "usersContainer"', () => {
        expect(wrapper.find('.usersContainer').length).toBe(1);
    });

    it('should render the Navbar component', () => {
        expect(wrapper.find(Navbar).length).toBe(1);
    });

    it('should render the Knowledge component', () => {
        expect(wrapper.find(Knowledge).length).toBe(1);
    });
});
