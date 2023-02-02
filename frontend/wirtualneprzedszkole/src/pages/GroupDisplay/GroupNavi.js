import React from "react";
import "../User/Users.scss"
import {useNavigate} from "react-router-dom";
import GroupComponent from "./GroupComponent";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";

const GroupNavi = () => {
    const navigate = useNavigate();
    return (
        <div data-testid="group-navi" className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <GroupComponent/>
                <button data-testid ="group-navi-button" className="button" onClick={() => navigate('/add-group')}>Dodaj Grupę</button>
            </div>
        </div>
    )
}

export default GroupNavi;
