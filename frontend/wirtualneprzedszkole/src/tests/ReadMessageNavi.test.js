import React from 'react';
import {render} from '@testing-library/react';
import ReadMessageNavi from '../pages/messages/ReadMessageNavi';
import {MemoryRouter} from "react-router-dom";

describe('ReadMessageNavi component', () => {
    it('should render the sidebar component', () => {
        const {getByTestId} = render(<MemoryRouter>
            <ReadMessageNavi/>
        </MemoryRouter>);
        const sidebar = getByTestId('sidebar');
        expect(sidebar).toBeTruthy();
    });

    it('should render the navbar component', () => {
        const {getByTestId} = render(<MemoryRouter>
            <ReadMessageNavi/>
        </MemoryRouter>);
        const navbar = getByTestId('navbar');
        expect(navbar).toBeTruthy();
    });

    it('should render the ReadMessage component', () => {
        const {getByTestId} = render(<MemoryRouter>
            <ReadMessageNavi/>
        </MemoryRouter>);
        const readMessage = getByTestId('read-message');
        expect(readMessage).toBeTruthy();
    });
});
