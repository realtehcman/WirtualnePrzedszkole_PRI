import React from "react";
import './CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import { useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";

const AddUser = () => {
    const navigate = useNavigate();
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