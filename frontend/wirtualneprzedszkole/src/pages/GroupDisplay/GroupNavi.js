import React from "react";
import "../User/Users.scss"
import {useNavigate} from "react-router-dom";
import GroupComponent from "./GroupComponent";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useTranslation } from "react-i18next";

const GroupNavi = () => {
  const {t} = useTranslation();

    const navigate = useNavigate();
    return (
        <div data-testid="group-navi" className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <GroupComponent/>
                <button data-testid ="group-navi-button" className="button" onClick={() => navigate('/add-group')}>{t('add_group')}</button>
            </div>
        </div>
    )
}

export default GroupNavi;
