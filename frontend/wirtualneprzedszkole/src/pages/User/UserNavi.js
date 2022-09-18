import React from "react";
import "./Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import User from "./User"
import {useParams} from "react-router-dom";

const UserNavi = () => {
    let {id} = useParams()
    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <User value={id}/>
            </div>
        </div>
    )
}

export default UserNavi