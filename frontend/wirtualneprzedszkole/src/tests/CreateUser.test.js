import React from "react";
import {configure, shallow} from "enzyme";
import CreateUser from "../pages/CreateUser/CreateUser";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe('CreateUser component', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = shallow(<CreateUser/>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call componentDidMount', () => {
    const spy = jest.spyOn(CreateUser.prototype, 'componentDidMount');
    wrapper = shallow(<CreateUser/>);
    expect(spy).toHaveBeenCalled();
  });


});
