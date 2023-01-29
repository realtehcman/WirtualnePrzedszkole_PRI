import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import ChildrenService from './ChildrenService'
import Child from './Child'
import {MemoryRouter} from 'react-router-dom'

jest.mock('./ChildrenService')

describe('Child component', () => {
    beforeEach(() => {
        ChildrenService.getChild.mockResolvedValue({
            data: {
                id: 1,
                name: 'John',
                lastName: 'Doe',
                parents: [{
                    id: 1,
                    name: 'Jane',
                    lastName: 'Doe',
                    email: 'jane.doe@example.com'
                }]
            }
        })
    })

    it('should render child name and lastname', async () => {
        render(
                <MemoryRouter path="/child/:id">
                    <Child />
                </MemoryRouter>
        )

        await waitFor(() => screen.getByText('Rodzice: John Doe'))
    })

    it('should render parent name, lastname and email', async () => {
        render(
                <MemoryRouter path="/child/:id">
                    <Child />
                </MemoryRouter>
        )

        await waitFor(() => screen.getByText('Jane'))
        await waitFor(() => screen.getByText('Doe'))
        await waitFor(() => screen.getByText('jane.doe@example.com'))
    })

    it('should navigate to parent page when view button is clicked', async () => {
        const navigate = jest.fn()

        render(
                <MemoryRouter path="/child/:id">
                    <Child />
                </MemoryRouter>
        )

        await waitFor(() => screen.getByRole('button', { name: 'Zobacz' }))
        fireEvent.click(screen.getByRole('button', { name: 'Zobacz' }))

    })
})
