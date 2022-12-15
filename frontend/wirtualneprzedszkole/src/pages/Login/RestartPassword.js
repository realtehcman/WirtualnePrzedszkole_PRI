import React, { useState } from 'react'

import "./login.scss"
import { useNavigate } from "react-router-dom";
import Current_UserService from '../Home/Current_UserService';

const RestartPassword = () => {    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [reset, setReset] = useState({
        
        email: '',
        token: '',
        password: ''
    });

    const restartPassword = async (e) => {
        e.preventDefault();
        let restart = await Current_UserService.restartPassword(reset)
        console.log(restart)
        //navigate("/ChangePassword")
    }

    return (
        
        <div className='formContainer'>
                <span className="logo-login">Przedszkole nr 25</span>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <div className='form-body'>
                            <form onSubmit={restartPassword}>
                                <div className='form-group'>
                                    <input placeholder='Email' name="Email" className='"form-control' 
                                    onChange={e => setReset({email: e.target.value})}/>
                                </div>
                                <div className="form-but">
                                    <button className="button">Wyślij</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        
    )
}


export default RestartPassword