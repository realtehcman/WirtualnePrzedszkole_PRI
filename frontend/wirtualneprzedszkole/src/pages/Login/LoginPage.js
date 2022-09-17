import React, { useState } from 'react'

import LoginService from './LoginService'
import "./login.scss"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        let loggedIn = await LoginService.login(email, password)
        console.log(loggedIn)
        navigate("/home")
    }

    return (
        <div className='formContainer'>
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
                                <div className="form-but">
                                    <button className="button">Zaloguj się</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        
        //ponizej najstarsza wersja
        // <div className='formContainer'>
        //     <button className="button" onClick={login}>login</button>              
        // </div>
        
    )
}


export default LoginPage