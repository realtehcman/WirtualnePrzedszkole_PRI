import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddGalleryNavi from '../pages/gallery/AddGalleryNavi';

jest.mock('../../components/sidebar/sidebar', () => () => <div>Mocked Sidebar</div>);
jest.mock('../../components/navbar/navbar', () => () => <div>Mocked Navbar</div>);
jest.mock('./AddGallery', () => () => <div>Mocked AddGallery</div>);

describe('<AddGalleryNavi />', () => {
    it('should render correctly', () => {
        const { container } = render(<AddGalleryNavi />);
        expect(container.querySelector('.users.gallery')).toBeTruthy();
    });
});
