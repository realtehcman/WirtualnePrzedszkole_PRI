import React, { useEffect, useState } from "react";
import "./navbar.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import {Link, useNavigate} from "react-router-dom";
import LoginService from "../../pages/Login/LoginService.js";
import i18next from 'i18next';
import { useTranslation } from "react-i18next";


const Navbar = () => {
    const navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        await LoginService.logout()
        navigate("/")
    }



    return (
        <div data-testid="navbar" className="navbar p-0">
            <div className="App_card">
                <div className="wrapper d-flex justify-content-end align-items-center">

                    <div className="logout btn">
                        <LogoutIcon/>
                        <span onClick={logout}>Wyloguj się</span>

                    </div>

                </div>
            </div>
        </div>
    )
}


export default Navbar
