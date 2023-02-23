import React from 'react';
import {configure, shallow} from 'enzyme';
import Message from '../pages/messages/Message';
import MessageService from '../pages/messages/MessageService';
import Adapter from "enzyme-adapter-react-16";

jest.mock('./MessageService');
configure({ adapter: new Adapter() });

describe('Message component', () => {
    let wrapper;
    const received_messages = [{id: 1, author: 'John', subject: 'Hello', content: 'Hello, how are you?'}, {
        id: 2,
        author: 'Jane',
        subject: 'Test',
        content: 'This is a test message.'
    }];

    beforeEach(() => {
        MessageService.getReceivedMessages.mockResolvedValue({data: received_messages});
        wrapper = shallow(<Message/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the received messages in a table', () => {
        expect(wrapper.find('tbody').children()).toHaveLength(2);
    });

    it('should call the MessageService.deleteReceivedMessages method when the deleteReceivedMessages function is called', () => {
        MessageService.deleteReceivedMessages.mockResolvedValue();
        wrapper.instance().deleteReceivedMessages(1);
        expect(MessageService.deleteReceivedMessages).toHaveBeenCalledWith(1);
    });

});
