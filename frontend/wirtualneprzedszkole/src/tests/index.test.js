import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {render} from "@testing-library/react";

configure({adapter: new Adapter()});

describe('App component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders correctly', () => {
        const {getByTestId} = render(
                <App/>
        );
        expect(getByTestId('app')).toBeTruthy();
    });
});
