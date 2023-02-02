import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import MessageNavi from './MessageNavi';

describe('MessageNavi component', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <MessageNavi />
            </MemoryRouter>
        );
        expect(getByTestId('message-navi')).toBeTruthy();
        expect(getByTestId('sidebar')).toBeTruthy();
        expect(getByTestId('navbar')).toBeTruthy();
        expect(getByTestId('message')).toBeTruthy();
    });
});
