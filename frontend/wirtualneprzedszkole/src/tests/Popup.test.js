import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import Popup from '../pages/GroupDisplay/Popup'

describe('Popup component', () => {
    it('should render', () => {
        const { getByTestId } = render(<Popup trigger={true} setTrigger={() => {}} />)
        expect(getByTestId('popup')).toBeTruthy()
    })

    it('should not render when trigger is false', () => {
        const { queryByTestId } = render(<Popup trigger={false} setTrigger={() => {}} />)
        expect(queryByTestId('popup')).toBeNull()
    })

    it('should call setTrigger function when close button is clicked', () => {
        const setTrigger = jest.fn()
        const { getByTestId } = render(<Popup trigger={true} setTrigger={setTrigger} />)
        fireEvent.click(getByTestId('btn-close'))
        expect(setTrigger).toHaveBeenCalledWith(false)
    })

})
