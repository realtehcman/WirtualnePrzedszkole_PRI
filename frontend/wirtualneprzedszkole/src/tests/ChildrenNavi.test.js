import React from 'react';
import ChildrenNavi from '../pages/Children/ChildrenNavi';
import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

describe('ChildrenNavi component', () => {
    it('should render the component', () => {
        const { getByTestId } = render(
            <Router>
                <ChildrenNavi />
            </Router>
        );
        const childNavi = getByTestId("children-navi");
        expect(childNavi).toBeTruthy();
    });

    it('should render the ChildrenComponent', () => {
        const { getByTestId } = render(
            <Router>
                <ChildrenNavi />
            </Router>
        );
        const childrenComponent = getByTestId("children-component");
        expect(childrenComponent).toBeTruthy();
    });

    it('should navigate to add-child page when the button is clicked', () => {
        const { getByTestId } = render(
            <Router>
                <ChildrenNavi />
            </Router>
        );
        const button = getByTestId("add-child-button");
        fireEvent.click(button);
        expect(window.location.pathname).toEqual('/add-child');
    });
});
