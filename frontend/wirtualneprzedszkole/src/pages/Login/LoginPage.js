import React, { useState } from 'react'
import LoginService from './LoginService'
import { useNavigate } from "react-router-dom";
import "./login.scss"
import { useTranslation } from "react-i18next";


const LoginPage = () => {
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const login = async (e) => {
        e.preventDefault();
        let loggedIn = await LoginService.login(email, password)
        if (loggedIn === false) {
            setErrorMessage("Wprowadzone dane są nieprawidłowe.")
        }
        else {
            navigate("/home")
            window.location.reload();
        }
    }

    const resetPassword = () => {
        navigate("/restart-password")
    }

    return (

        <div data-testid="login" className='container-fluid h-100'>
            <div className='row justify-content-center align-items-center h-100'>
                <div className='col-md-8 col-lg-5 col-12'>
                    <span className="logo-login"> Przedszkole nr 25 </span>
                    <div className='card p-4 box_shadow border-0'>
                        <div className='form-body'>
                            <form onSubmit={login}>
                                <div className='form-group'>
                                    <input placeholder="email" name="Email" className='"form-control'
                                           onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className='form-group'>
                                    <input type="password" placeholder="hasło" name="Password" className='"form-control'
                                           onChange={e => setPassword(e.target.value)} />
                                </div>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <div className="form-but">
                                    <button className="button btn mb-3">Zaloguj się</button>
                                </div>
                                <div className="form-but">
                                    <button type="button" className='btn btn-info' onClick={() => resetPassword()}>Zapomniałeś hasła?</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}


export default LoginPage
