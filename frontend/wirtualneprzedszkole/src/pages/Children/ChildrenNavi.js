import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import "./ChildrenComponent"
import ChildrenComponent from "./ChildrenComponent"
import { useNavigate } from "react-router-dom";

const ChildrenNavi = () => {
    const navigate = useNavigate();
    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <ChildrenComponent/>
                <button className="button" onClick={() => navigate('/add-child', { replace: true })}>Dodaj Dziecko</button>
            </div>
        </div>
    )
}

export default ChildrenNavi