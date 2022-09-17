import React from "react";
import "./navbar.scss"
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="logout">
                    <LogoutIcon/>
                    Wyloguj się
                </div>
            </div>
        </div>
    )
}


export default Navbar