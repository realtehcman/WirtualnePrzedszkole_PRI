import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Message from "./Message"
import SendMessage from "./SendMessage"
import {useParams} from "react-router-dom";

const MessageNavi = () => {
    let {id} = useParams()
    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <Message value={id}/>
            </div>
        </div>
    )
}

export default MessageNavi