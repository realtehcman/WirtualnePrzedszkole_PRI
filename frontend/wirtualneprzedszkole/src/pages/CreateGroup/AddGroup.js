import React from "react";
import '../CreateUser/CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import { useNavigate } from "react-router-dom";
import CreateGroup from "./CreateGroup";

const AddGroup = () => {
    const navigate = useNavigate();
    return (
        <div className="addusers">
            <Sidebar/>
            <div className="addusersContainer">
                <Navbar/>
                <CreateGroup/>
            </div>
        </div>
    )
}

export default AddGroup