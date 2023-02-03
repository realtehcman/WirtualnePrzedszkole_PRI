import React from 'react';
import {configure, shallow} from 'enzyme';
import Sidebar from './Sidebar';
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";

configure({adapter: new Adapter()});
jest.mock('../../pages/Home/CurrentUserService');

describe('Sidebar', () => {
    let wrapper;
    let screenSize;

    beforeEach(() => {
        wrapper = shallow(<MemoryRouter><Sidebar/></MemoryRouter>);
        screenSize = window.innerWidth;

    });

    afterEach(() => {
        jest.clearAllMocks();
        window.innerWidth = screenSize;
    });

    it('should render without crashing', () => {
        expect(wrapper).toBeDefined();
    });

});
