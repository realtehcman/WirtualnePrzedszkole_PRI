import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import EditUser from "./EditUser"
import {useParams} from "react-router-dom";

const EditUserNavi = () => {
    let {id} = useParams()
    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <div className="App_card">
                <EditUser value={id}/>
                </div>
            </div>
        </div>
    )
}

export default EditUserNavi