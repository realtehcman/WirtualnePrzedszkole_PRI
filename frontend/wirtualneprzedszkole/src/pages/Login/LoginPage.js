import React, { useState } from 'react'

import LoginService from './LoginService'
import "./login.scss"
import { useNavigate } from "react-router-dom";
import RestartPassword from './RestartPassword';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const login = async (e) => {
        e.preventDefault();
        let loggedIn = await LoginService.login(email, password)
        console.log(loggedIn)
        if(loggedIn === false) {
            setErrorMessage("Wprowadzone dane są nieprawidłowe.")
        }
        else {
            navigate("/home")
        }
    }

    const resetPassword = () => {
        navigate("/restart-password")
    }

    return (

        <div className='formContainer'>
            <span className="logo-login">Przedszkole nr 25</span>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <div className='form-body'>
                        <form onSubmit={login}>
                            <div className='form-group'>
                                <input placeholder='Email' name="Email" className='"form-control'
                                       onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <input type="password" placeholder='Password' name="Password" className='"form-control'
                                       onChange={e => setPassword(e.target.value)}/>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <div className="form-but">
                                <button className="button">Zaloguj się</button>
                            </div>
                            <div className="form-but">
                                <button type="button" className='btn btn-info' onClick={() => resetPassword() }>Nie pamiętasz hasła?</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginPage