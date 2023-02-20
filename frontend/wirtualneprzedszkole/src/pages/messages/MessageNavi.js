import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Message from "./Message"
import {useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";

const MessageNavi = () => {
    const {t} = useTranslation();
    let {id} = useParams()
    return (
        <div data-testid="message-navi" className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <Message value={id} t={t}/>
            </div>
        </div>
    )
}

export default MessageNavi
