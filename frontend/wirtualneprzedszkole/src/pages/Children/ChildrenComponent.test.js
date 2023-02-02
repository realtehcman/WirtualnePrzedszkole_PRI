import React from "react";
import ChildrenService from "./ChildrenService";
import "../User/Table.scss";
import {render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChildrenComponent from "./ChildrenComponent";

describe('ChildrenComponent', () => {
    let children;
    let mockGetChildren;
    let mockDeleteChild;

    beforeEach(() => {
        children = [
            {
                id: 1,
                name: 'John',
                lastName: 'Doe',
                classId: 'A'
            },
            {
                id: 2,
                name: 'Jane',
                lastName: 'Smith',
                classId: 'B'
            },
        ];

        mockGetChildren = jest.fn().mockResolvedValue({data: children});

        ChildrenService.getChildren = mockGetChildren;
        ChildrenService.deleteChild = mockDeleteChild;
    });

    it('should render a table with the correct children data', async () => {
        const {container} = render(<ChildrenComponent/>);

        await waitFor(() => expect(mockGetChildren).toHaveBeenCalled());

        expect(container).toHaveTextContent('Id');
        expect(container).toHaveTextContent('Imię');
        expect(container).toHaveTextContent('Nazwisko');
        expect(container).toHaveTextContent('Grupa');
        expect(container).toHaveTextContent('Akcje');

        expect(container.querySelectorAll('tr').length).toBe(1);
    });

});
