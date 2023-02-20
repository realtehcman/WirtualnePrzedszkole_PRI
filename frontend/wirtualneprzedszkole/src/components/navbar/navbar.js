import React, { useEffect } from "react";
import "./navbar.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import LoginService from "../../pages/Login/LoginService.js";
import i18next from 'i18next';


const Navbar = () => {

    // useEffect(() =>{
    //     i18next.changeLanguage('po');
    // })
    const navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        await LoginService.logout()
        navigate("/")
    }

    const onchangeLanguage = (e) => {
        i18next.changeLanguage(e.target.value);
    }

    return (
        <div data-testid="navbar" className="navbar p-0">
            <div className="App_card">
            <div className="wrapper d-flex justify-content-end align-items-center">
                <div className="me-4">
                    <select defaultValue='en' className="form-select border-0" onChange={onchangeLanguage}>
                        <option value="en">English</option>
                        <option value="po">Polish</option>
                    </select>
                </div>
                <div className="logout btn">
                    <LogoutIcon/>
                    <span onClick={logout}> Wyloguj się</span>
                </div>
            </div>
            </div>
        </div>
    )
}


export default Navbar
