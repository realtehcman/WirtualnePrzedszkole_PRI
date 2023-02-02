import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import ReadMessage from "./ReadMessage"

const ReadMessageNavi = () => {

    return (
        <div data-testid="read-message" className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <ReadMessage/>
            </div>
        </div>
    )
}

export default ReadMessageNavi
