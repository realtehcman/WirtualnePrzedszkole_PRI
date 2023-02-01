import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import ReadMessage from "./ReadMessage"
import {useNavigate} from "react-router-dom";

const ReadMessageNavi = () => {
    const navigate = useNavigate();

    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <ReadMessage/>
            </div>
        </div>
    )
}

export default ReadMessageNavi