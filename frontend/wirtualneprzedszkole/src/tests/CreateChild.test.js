import React from 'react';
import {configure, shallow} from 'enzyme';
import CreateChild from '../pages/CreateChild/CreateChild';
import GroupService from '../pages/GroupDisplay/GroupService';
import ChildrenService from '../pages/Children/ChildrenService';
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

jest.mock('../GroupDisplay/GroupService');
jest.mock('../Children/ChildrenService');

describe('CreateChild component', () => {
  let wrapper;
  const mockGroups = [{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }];

  beforeEach(() => {
    GroupService.getGroups.mockResolvedValue({ data: mockGroups });
    wrapper = shallow(<CreateChild />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the getGroups method on GroupService on mount', () => {
    expect(GroupService.getGroups).toHaveBeenCalled();
  });

  it('should update the state with the list of groups returned from the service', () => {
    expect(wrapper.state().classes).toEqual(['', ...mockGroups]);
  });

  it('should call the addChild method on ChildrenService on form submit', () => {
    ChildrenService.addChild.mockResolvedValue({});
    wrapper.setState({ name: 'John', lastName: 'Doe', className: 'Group 1' });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(ChildrenService.addChild).toHaveBeenCalledWith(JSON.stringify({ name: 'John', lastName: 'Doe', classId: 1 }));
  });

  it('should update the state when the name input is changed', () => {
    wrapper.find('input[name="Imię"]').simulate('change', { target: { value: 'Jane' } });
    expect(wrapper.state().name).toEqual('Jane');
  });

  it('should update the state when the last name input is changed', () => {
    wrapper.find('input[name="Nazwisko"]').simulate('change', { target: { value: 'Doe' } });
    expect(wrapper.state().lastName).toEqual('Doe');
  });

  it('should update the state when the class select is changed', () => {
    wrapper.find('select').simulate('change', { target: { value: 'Group 2' } });
    expect(wrapper.state().className).toEqual('Group 2');
  });
});
