import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import EditCurrentUser from './EditCurrentUser';
import {MemoryRouter} from "react-router-dom";

jest.mock('./CurrentUserService');
describe('EditCurrentUser', () => {
    it('renders correctly', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <EditCurrentUser/>
            </MemoryRouter>
        );
        expect(getByTestId('edit-user')).toBeTruthy();
    });
});

