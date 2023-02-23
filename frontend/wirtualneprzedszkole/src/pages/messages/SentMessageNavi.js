import React, { useEffect, useRef, useState } from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import SentMessage from "./SentMessage"
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SentMessageNavi = () => {
    const [navHeight, setNavHeight] = useState(0);
    const { t } = useTranslation();
    let { id } = useParams()
    const navRef = useRef(null);

    useEffect(() => {
        setNavHeight(navRef.current.clientHeight);
      },[navHeight]);

    return (
        <div className="users" data-testid="sent-message-navi">
            <Sidebar />
            <div className="usersContainer">
                <div ref={navRef}>
                    <Navbar />
                </div>
                <div className="App_card" style={{height: `calc(100% - ${navHeight}px)`}}>
                    <SentMessage value={id} t={t} />
                </div>
            </div>
        </div>
    )
}

export default SentMessageNavi
