import React, { useState } from 'react'

import LoginService from './LoginService'
import "./login.scss"
import { useNavigate } from "react-router-dom";

const LoginButton = () => {    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        let loggedIn = await LoginService.login(email, password)
        console.log(loggedIn)
        navigate("/")
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
                                        <button className="button">Zaloguj się</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
        // <div className="login-wrapper">
        //     <h1>Please Log In</h1>
        //     <form onSubmit={login}>
        //     <label>
        //         <p>Username</p>
        //         <input type="text" onChange={e => setEmail(e.target.value)}/>
        //     </label>
        //     <label>
        //         <p>Password</p>
        //         <input type="password" onChange={e => setPassword(e.target.value)}/>
        //     </label>
        //     <div className='formContainer'>
        //         <button type="submit">Login</button>             
        //     </div>
        //     </form>
        // </div>
        //ponizej najstarsza wersja
        // <div className='formContainer'>
        //     <button className="button" onClick={login}>login</button>              
        // </div>
        
    )
}


export default LoginButton