import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import "./GroupComponent"
import GroupComponent from "./GroupComponent"
import { useNavigate } from "react-router-dom";

const GroupNavi = () => {
    const navigate = useNavigate();
    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <GroupComponent/>
                <button className="button" onClick={() => navigate('/add-group')}>Dodaj Grupę</button>
            </div>
        </div>
    )
}

export default GroupNavi