import React, { useEffect } from "react";
import "./navbar.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import LoginService from "../../pages/Login/LoginService.js";
import i18next from 'i18next';


const Navbar = () => {

    useEffect(() =>{
        i18next.changeLanguage('po');
    })
    const navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        await LoginService.logout()
        navigate("/")
    }

    return (
        <div data-testid="navbar" className="navbar">
            <div className="wrapper">
                <div className="logout">
                    <LogoutIcon/>
                    <span onClick={logout}> Wyloguj się</span>
                </div>
            </div>
        </div>
    )
}


export default Navbar
