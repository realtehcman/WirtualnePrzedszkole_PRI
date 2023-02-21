import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import SentMessage from "./SentMessage"
import {useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";

const SentMessageNavi = () => {
    const {t} = useTranslation();
    let {id} = useParams()
    return (
        <div className="users" data-testid="sent-message-navi">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <SentMessage value={id} t={t}/>
            </div>
        </div>
    )
}

export default SentMessageNavi
