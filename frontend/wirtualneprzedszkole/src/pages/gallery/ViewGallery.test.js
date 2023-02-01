import React from 'react';
import {configure, shallow} from 'enzyme';
import ViewGallery from './ViewGallery';
import GalleryService from '../gallery/GalleryService';
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

jest.mock('../gallery/GalleryService');

describe('ViewGallery', () => {
    let wrapper;

    beforeEach(() => {
        GalleryService.ViewFolder.mockResolvedValue({ data: { id: '123' } });
        wrapper = shallow(<ViewGallery />);
    });

    it('should render the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

});
