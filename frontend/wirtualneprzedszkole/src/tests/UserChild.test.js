import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import UserChild from "../pages/UserChild/UserChild";

describe('UserChild', () => {
    it('should render the Sidebar, Navbar and UserChild', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <UserChild />
            </MemoryRouter>
        );

        expect(getByTestId('user-child')).toBeTruthy();
    });
});
