import React from 'react';
import {configure, shallow} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import AddGroup from '../pages/CreateGroup/AddGroup';
import Adapter from "enzyme-adapter-react-16";
import {render} from "@testing-library/react";

configure({adapter: new Adapter()});

describe('AddGroup component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(
            <MemoryRouter>
                <AddGroup/>
            </MemoryRouter>
        );
        expect(wrapper.exists()).toBe(true);
    });

    it('should render the Sidebar component', () => {
        const {getByTestId} = render(<MemoryRouter>
            <AddGroup/>
        </MemoryRouter>);
        const navbar = getByTestId('sidebar');
        expect(navbar).toBeTruthy();
    });

    it('should render the Navbar component', () => {
        const {getByTestId} = render(<MemoryRouter>
            <AddGroup/>
        </MemoryRouter>);
        const navbar = getByTestId('navbar');
        expect(navbar).toBeTruthy();
    });

    it('should render the CreateGroup component', () => {
        const {getByTestId} = render(<MemoryRouter>
            <AddGroup/>
        </MemoryRouter>);
        const navbar = getByTestId('createGroup');
        expect(navbar).toBeTruthy();

    });
});
