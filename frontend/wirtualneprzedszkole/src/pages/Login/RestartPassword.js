import React, {useState} from 'react'

import "./login.scss"
import CurrentUserService from '../Home/CurrentUserService';
import { useTranslation } from "react-i18next";

const RestartPassword = () => { 
    const {t} = useTranslation();   
    const [reset, setReset] = useState({
        
        email: '',
        token: '',
        password: ''
    });

    const restartPassword = async (e) => {
        e.preventDefault();
        await CurrentUserService.restartPassword(reset)
    }

    return (
        
        <div data-testid="restart-password" className='formContainer'>
                <span className="logo-login">{t('kindergarten_no_25')}</span>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <div className='form-body'>
                            <form onSubmit={restartPassword}>
                                <div className='form-group'>
                                    <input placeholder='Email' name="Email" className='"form-control' 
                                    onChange={e => setReset({email: e.target.value})}/>
                                </div>
                                <div className="form-but">
                                    <button className="button">{t('send')}</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        
    )
}


export default RestartPassword
