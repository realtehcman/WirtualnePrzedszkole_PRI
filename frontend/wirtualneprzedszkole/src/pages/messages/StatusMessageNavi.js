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
                <div className="App_card">
                <StatusMessage/>
                </div>
            </div>
        </div>
    )
}

export default StatusMessageNavi
