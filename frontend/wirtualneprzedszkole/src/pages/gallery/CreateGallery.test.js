import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateGallery from './CreateGallery';

jest.mock('../gallery/GalleryService');

describe('CreateGallery', () => {
    afterEach(cleanup);

    it('should render the form elements', () => {
        const { getByPlaceholderText, getByText } = render(<CreateGallery />);
        expect(getByPlaceholderText('Grupa')).toBeInTheDocument();
        expect(getByText('Zapisz')).toBeInTheDocument();
    });

    it('should update the state when the input fields change', () => {
        const { getByPlaceholderText } = render(<CreateGallery />);
        const folderInput = getByPlaceholderText('Grupa');
        fireEvent.change(folderInput, { target: { value: 'Test Folder' } });
        expect(folderInput.value).toBe('Test Folder');
    });

});
