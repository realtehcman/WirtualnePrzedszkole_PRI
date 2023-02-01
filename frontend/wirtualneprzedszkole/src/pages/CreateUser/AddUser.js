import React from "react";
import './CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import CreateUser from "./CreateUser";

const AddUser = () => {
    return (
        <div className="addusers">
            <Sidebar/>
            <div className="addusersContainer">
                <Navbar/>
                <CreateUser/>
            </div>
        </div>
    )
}

export default AddUser
