import {render} from '@testing-library/react';
import App from "./App";

describe('App', () => {
    test('renders login page by default', () => {
        const {container} = render(
                <App/>
        );
        expect(container.getElementsByClassName('login').length).toBe(1)
    });

});
