import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import {useNavigate} from "react-router-dom";
import ViewMessage from "./ViewMessage"

const ViewMessageNavi = () => {
    const navigate = useNavigate();

    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <ViewMessage/>
            </div>
        </div>
    )
}

export default ViewMessageNavi