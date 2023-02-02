import React from 'react';
import ReadMessage from './ReadMessage';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

jest.mock('./MessageService', () => ({
    getMessage: jest.fn().mockResolvedValue({
        data: {
            id: '1',
            author: 'Author 1',
            subject: 'Subject 1',
            content: 'Content 1',
        },
    }),
}));

describe('ReadMessage component', () => {
    let params;

    beforeEach(() => {
        params = { id: '1' };
        jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the message content', () => {
        const wrapper = shallow(<ReadMessage />);

        expect(wrapper.text()).toContain('Treść');
    });

});
