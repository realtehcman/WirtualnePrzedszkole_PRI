import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import StatusMessage from "./StatusMessage"

const StatusMessageNavi = () => {

    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <StatusMessage/>
            </div>
        </div>
    )
}

export default StatusMessageNavi
