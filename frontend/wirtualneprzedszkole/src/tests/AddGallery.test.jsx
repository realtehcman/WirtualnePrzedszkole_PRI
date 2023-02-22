import React from 'react'
import {configure} from 'enzyme'
import AddGallery from '../pages/gallery/AddGallery'
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";

configure({adapter: new Adapter()});

describe('AddGallery component', () => {
  it('renders correctly', () => {
    const {getByTestId} = render(
        <MemoryRouter>
          <AddGallery/>
        </MemoryRouter>
    );
    expect(getByTestId('add-gallery')).toBeTruthy();
  });
});
