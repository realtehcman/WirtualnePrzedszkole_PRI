import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Users from '../pages/User/Users';

describe('Users', () => {
    it('should render the Sidebar, Navbar and UserComponent', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <Users />
            </MemoryRouter>
        );

        expect(getByTestId('sidebar')).toBeTruthy();
        expect(getByTestId('navbar')).toBeTruthy();
        expect(getByTestId('user-component')).toBeTruthy();
    });
});
