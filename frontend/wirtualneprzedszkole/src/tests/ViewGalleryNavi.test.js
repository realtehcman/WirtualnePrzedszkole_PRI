import React from 'react';
import {configure, shallow} from 'enzyme';
import ViewGalleryNavi from '../pages/gallery/ViewGalleryNavi';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import ViewGallery from '../pages/gallery/ViewGallery';
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe('ViewGalleryNavi', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ViewGalleryNavi />);
    });

    it('should render a div with the class "users gallery"', () => {
        expect(wrapper.find('.users.gallery')).toHaveLength(1);
    });

    it('should render the Sidebar component', () => {
        expect(wrapper.find(Sidebar)).toHaveLength(1);
    });

    it('should render a div with the class "usersContainer"', () => {
        expect(wrapper.find('.usersContainer')).toHaveLength(1);
    });

    it('should render the Navbar component inside the "usersContainer" div', () => {
        expect(wrapper.find('.usersContainer').find(Navbar)).toHaveLength(1);
    });

    it('should render the ViewGallery component inside the "usersContainer" div', () => {
        expect(wrapper.find('.usersContainer').find(ViewGallery)).toHaveLength(1);
    });
});
