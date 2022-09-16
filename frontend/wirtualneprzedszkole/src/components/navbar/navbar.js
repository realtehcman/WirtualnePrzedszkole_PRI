import React from "react";
import "./navbar.scss"
import LogoutIcon from '@mui/icons-material/Logout';
import LoginButton from "../../pages/Login/LoginButton";


const Navbar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="logout">
                    <LogoutIcon/>
                    Wyloguj się
                </div>
                {/* <LoginButton/> */}
            </div>
        </div>
    )
}


export default Navbar