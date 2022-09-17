import React from "react";
import "./navbar.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import LoginService from "C:/Users/Szogunek/Desktop/WirtualnePrzedszkole_PRI/frontend/wirtualneprzedszkole/src/pages/Login/LoginService"


const Navbar = () => {
    const navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        let loggedIn = await LoginService.logout()
        console.log(loggedIn)
        navigate("/")
    }

    return (
        <div className="navbar">
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