import React from "react";
import "../User/Users.scss"
import {useNavigate} from "react-router-dom";
import GroupComponent from "./GroupComponent";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";
import { useTranslation } from "react-i18next";

const GroupNavi = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);


    if (currentUser.role === "PARENT") {
        return (
            <div data-testid="group-navi" className="users">
                <Sidebar />
                <div data-testid="usersContainer" className="usersContainer">
                    <Navbar />
                    <p><h1>You don't have permission to access this page.</h1></p>
                </div>
            </div>
        );
    }
    return (
        <div data-testid="group-navi" className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <GroupComponent/>
                {currentUser.role === "ADMIN" && <button data-testid ="group-navi-button" className="button" onClick={() => navigate('/add-group')}>{t('add_group')}</button>}
            </div>
        </div>
    )
}

export default GroupNavi;
