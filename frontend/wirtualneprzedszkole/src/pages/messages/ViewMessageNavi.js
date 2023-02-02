import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import ViewMessage from "./ViewMessage"

const ViewMessageNavi = () => {
    return (
        <div data-testid='view-message-navi' className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <ViewMessage/>
            </div>
        </div>
    )
}

export default ViewMessageNavi
