import React from 'react';
import {configure, shallow} from 'enzyme';
import SendMessage from '../pages/messages/SendMessage';
import SendMessageService from '../pages/messages/SendMessageService';
import Adapter from "enzyme-adapter-react-16";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import SentMessage from "../pages/messages/SentMessage";

configure({adapter: new Adapter()});

jest.mock('./SendMessageService');

describe('SendMessage component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SendMessage />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const {getByTestId} = render(
        <MemoryRouter>
          <SentMessage/>
        </MemoryRouter>
    );
    expect(getByTestId('sent-message')).toBeTruthy();
  });


});
