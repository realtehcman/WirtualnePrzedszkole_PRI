import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/navbar/Navbar';
import LoginService from '../pages/Login/LoginService';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

jest.mock('../pages/Login/LoginService', () => {
  return {
    logout: jest.fn()
  }
});

describe('Navbar', () => {
  test('logout button logs out and redirects to home page', async () => {
    jest.mock('react-router-dom', () => {
        return {
            useNavigate: jest.fn()
        };
    });

    const history = createMemoryHistory();
    var ReactDOM = require('react-dom');
    var React = require('react');
    var { Route, Router, IndexRoute } = require('react-router');

    const { getByText } = ReactDOM.render(
        <Router history={history}>
            <Navbar />
                <Route path='/' component={App} />

        </Router>
    );

    const logoutButton = getByText('Wyloguj się');
    const navigate = jest.fn();
    Navbar.__Rewire__('useNavigate', () => navigate);

    fireEvent.click(logoutButton);
    expect(LoginService.logout).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/');
  });
});