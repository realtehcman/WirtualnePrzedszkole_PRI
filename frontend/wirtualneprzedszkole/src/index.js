import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = localStorage.getItem("authorization");
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
