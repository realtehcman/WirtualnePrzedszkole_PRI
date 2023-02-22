import React from 'react';
import {configure, shallow} from 'enzyme';
import StatusMsg from '../pages/messages/StatusMessage';
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

jest.mock('./MessageService', () => ({
    getSentMessage: jest.fn(() => Promise.resolve({
        data: {
            id: 1,
            author: 'John Doe',
            subject: 'Test message',
            content: 'This is a test message',
            to: [{name: 'Jane', lastName: 'Doe', email: 'jane@example.com', isRead: true}]
        }
    }))
}));

describe('<StatusMsg />', () => {

    it('should render without crashing', () => {
        const wrapper = shallow(
            <StatusMsg/>
        );
        expect(wrapper.exists()).toBe(true);
    });

});
