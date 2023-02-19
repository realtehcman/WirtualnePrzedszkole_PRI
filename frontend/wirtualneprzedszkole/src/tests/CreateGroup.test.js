import {fireEvent, render} from '@testing-library/react';
import React from 'react';
import CreateGroup from '../pages/CreateGroup/CreateGroup';
import GroupService from '../pages/GroupDisplay/GroupService';
import {MemoryRouter} from "react-router-dom";

jest.mock('../GroupDisplay/GroupService');

describe('CreateGroup component', () => {
    it('should render the form and input fields', () => {
        const {getByPlaceholderText} = render(<MemoryRouter><CreateGroup/></MemoryRouter>);
        const nameInput = getByPlaceholderText('Nazwa');
        const descInput = getByPlaceholderText('Opis');

        expect(nameInput).toBeTruthy();
        expect(descInput).toBeTruthy();
    });

    it('should update the state when input fields are changed', () => {
        const {getByPlaceholderText} = render(<MemoryRouter><CreateGroup/></MemoryRouter>);
        const nameInput = getByPlaceholderText('Nazwa');
        const descInput = getByPlaceholderText('Opis');

        fireEvent.change(nameInput, {target: {value: 'Test Group'}});
        fireEvent.change(descInput, {target: {value: 'Test Description'}});

        expect(nameInput.value).toBe('Test Group');
        expect(descInput.value).toBe('Test Description');
    });

    it('should call the addGroup method from GroupService and update the state when the form is submitted', async () => {
        GroupService.addGroup.mockResolvedValue({data: {name: 'Test Group', description: 'Test Description'}});
        const {getByPlaceholderText, getByText} = render(<MemoryRouter><CreateGroup/></MemoryRouter>);
        const nameInput = getByPlaceholderText('Nazwa');
        const descInput = getByPlaceholderText('Opis');
        const saveBtn = getByText('Zapisz');

        fireEvent.change(nameInput, {target: {value: 'Test Group'}});
        fireEvent.change(descInput, {target: {value: 'Test Description'}});
        fireEvent.click(saveBtn);

        expect(GroupService.addGroup).toHaveBeenCalledWith('{"name":"Test Group","description":"Test Description"}');
        expect(GroupService.addGroup).toHaveBeenCalledTimes(1);
    });

});
