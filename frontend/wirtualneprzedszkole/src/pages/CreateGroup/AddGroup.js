import React from "react";
import '../CreateUser/CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import CreateGroup from "./CreateGroup";

const AddGroup = () => {
    return (
        <div data-testid="addusers" className="addusers">
            <Sidebar/>
            <div data-testid="addusersContainer" className="addusersContainer">
                <Navbar/>
                <CreateGroup/>
            </div>
        </div>
    )
}

export default AddGroup
