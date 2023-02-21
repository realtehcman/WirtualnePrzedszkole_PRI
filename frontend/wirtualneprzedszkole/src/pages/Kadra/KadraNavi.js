import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Kadra from "./Kadra"
import {useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";

const KadraNavi = () => {
    const {t} = useTranslation();
    let {id} = useParams()
    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <div className="App_card">
                <Kadra value={id} t={t}/>
                </div>
            </div>
        </div>
    )
}

export default KadraNavi