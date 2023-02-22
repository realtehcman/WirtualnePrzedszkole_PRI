import React from 'react';
import {render} from '@testing-library/react';
import SentMessageNavi from '../pages/messages/SentMessageNavi';
import {MemoryRouter} from 'react-router-dom';
import "@testing-library/jest-dom/extend-expect";

describe('SentMessageNavi', () => {
    it("renders the sent message component", () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <SentMessageNavi/>
            </MemoryRouter>
        );
        const sentMessageComponent = getByTestId("sent-message");
        expect(sentMessageComponent).toBeInTheDocument();
    });

    it('passes the correct value to SentMessage', () => {
        const {getByTestId} = render(<MemoryRouter>
            <SentMessageNavi/>
        </MemoryRouter>);
        const sentMessage = getByTestId('sent-message');
        expect(sentMessage.id).toBeDefined();
    });

});
