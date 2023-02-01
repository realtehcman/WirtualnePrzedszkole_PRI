import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

//localStorage.setItem("authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3aXJ0dWFsbmUucHJ6ZWRzemtvbGUyNUBnbWFpbC5jb20iLCJleHAiOjE2NjMzMzgyODB9.EDGgowLdwEXmnC2WLB8RDHZ4cdzXAUC88XnTnh7NI1w")

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
