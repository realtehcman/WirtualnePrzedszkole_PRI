import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import UserChildNavi from "./UserChildNavi";

describe('UserChildNavi', () => {
    it('should render the Sidebar, Navbar and UserChildNavi', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <UserChildNavi />
            </MemoryRouter>
        );

        expect(getByTestId('user-child-navi')).toBeTruthy();
        expect(getByTestId('user-child')).toBeTruthy();
    });
});
