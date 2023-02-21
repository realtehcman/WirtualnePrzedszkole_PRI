import React, { useEffect, useState } from "react";
import "./navbar.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import LoginService from "../../pages/Login/LoginService.js";
import i18next from 'i18next';
import { useTranslation } from "react-i18next";


const Navbar = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

    // const currentLanguage = i18next.language
    // useEffect(() => {
    //     alert(currentLanguage);
    // })

    const logout = async (e) => {
        e.preventDefault();
        await LoginService.logout()
        navigate("/")
    }

    const onchangeLanguage = (e) => {
        setCurrentLanguage(e.target.value);
        i18next.changeLanguage(e.target.value);
    }

    return (
        <div data-testid="navbar" className="navbar p-0">
            <div className="App_card">
            <div className="wrapper d-flex justify-content-end align-items-center">
                <div className="me-4">
                    <select value={currentLanguage} className="form-select border-0" onChange={(e) => onchangeLanguage(e)}>
                        <option value="po">Polish</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div className="logout btn">
                    <LogoutIcon/>
                    <span onClick={logout}>{t('log_out')}</span>
                </div>
            </div>
            </div>
        </div>
    )
}


export default Navbar