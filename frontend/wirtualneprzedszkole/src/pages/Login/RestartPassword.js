import React, { useState } from 'react'

import "./login.scss"
import CurrentUserService from '../Home/CurrentUserService';
import { useTranslation } from "react-i18next";

const RestartPassword = () => {
    const { t } = useTranslation();
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
        <div className='reset_password'>
            <div data-testid="restart-password" className='container-fluid h-100'>
                <div className='row justify-content-center align-items-center h-100'>
                    <div className='col-md-8 col-lg-5 col-12'>
                        <span className="logo-login"> {t('kindergarten_no_25')} </span>
                        <div className='card p-4 box_shadow border-0'>
                            <div className='form-body'>
                                <form onSubmit={restartPassword}>
                                    <div className='form-group'>
                                        <input placeholder={t('email')} name="Email" className='"form-control'
                                            onChange={e => setReset({ email: e.target.value })} />
                                    </div>
                                    <div className="form-but">
                                        <button className="button btn mb-3">{t('send')}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default RestartPassword
