import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import SendMessage from "./SendMessage"
import {useParams} from "react-router-dom";

const SendMessageNavi = () => {
    let {id} = useParams()
    return (
        <div data-testid="send-message-navi" className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <SendMessage value={id}/>
            </div>
        </div>
    )
}

export default SendMessageNavi
