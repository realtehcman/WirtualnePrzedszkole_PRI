import React, {useState} from 'react'

import "./login.scss"
import {useNavigate, useParams} from "react-router-dom";
import CurrentUserService from '../Home/CurrentUserService';

const ChangePassword = () => {    
    const navigate = useNavigate();
    const params = useParams()
    const [newPassword, setNewPassword] = useState('');
    const [change, setChange] = useState({
        token: '',
        password: ''
    });

    const changePassword = async (e) => {
        e.preventDefault();
        if (change.password === newPassword) {
            await CurrentUserService.changePassword(change)
        }
        navigate("/")
    }

    return (
        
        <div data-testid="change-password" className='formContainer'>
                <span className="logo-login">Przedszkole nr 25</span>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <div className='form-body'>
                            <form onSubmit={changePassword}>
                                <div className='form-group'>
                                    <input type="password" input placeholder='Nowe Hasło' name="Password" className='"form-control' 
                                    onChange={e => setNewPassword(e.target.value)}/>
                                </div>
                                <div className='form-group'>
                                    <input type="password" input placeholder='Powtórz Hasło' name="Password" className='"form-control' 
                                    onChange={e => setChange({...change, password: e.target.value, token: params.token})}/>
                                </div>
                                <div className="form-but">
                                    <button className="button">Zmień</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        
    )
}


export default ChangePassword
