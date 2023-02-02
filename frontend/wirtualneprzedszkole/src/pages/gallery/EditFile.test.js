import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import EditFile from './EditFile';
import FileService from './FileService';

jest.mock('./FileService');

describe('EditFile', () => {
    it('should call patchFile with the correct data', async () => {
        // Arrange
        FileService.patchFile.mockResolvedValueOnce({ status: 200 });
        const fileId = '1';
        const description = 'Test description';
        const setFileDescription = jest.fn();
        const { getByText, getByPlaceholderText } = render(
            <EditFile
                fileId={fileId}
                description={description}
                setFileDescription={setFileDescription}
            />
        );

        // Act
        fireEvent.change(getByPlaceholderText(description), { target: { value: 'New description' } });
        fireEvent.click(getByText('Zapisz'));

        // Assert
        expect(FileService.patchFile).toHaveBeenCalledWith(fileId, { description: 'New description' });
    });

});
