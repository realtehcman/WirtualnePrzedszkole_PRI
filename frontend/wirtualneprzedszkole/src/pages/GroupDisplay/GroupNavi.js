import React from "react";
import "../User/Users.scss"
import {useNavigate} from "react-router-dom";
import GroupComponent from "./GroupComponent";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useTranslation } from "react-i18next";

const GroupNavi = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <div data-testid="group-navi" className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
               <div className="App_card">
               <GroupComponent t={t}/>
                <div className="text-center mt-4">
                <button data-testid ="button" className="button btn" onClick={() => navigate('/add-group')}>{t('add_group')}</button>
                </div>
               </div>
            </div>
        </div>
    )
}

export default GroupNavi;
