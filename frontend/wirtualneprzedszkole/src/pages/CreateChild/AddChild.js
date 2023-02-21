import React from "react";
import '../CreateUser/CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import CreateChild from "./CreateChild";

const AddChild = () => {
    return (
        <div className="addusers">
            <Sidebar/>
            <div className="addusersContainer">
                <Navbar/>
                <CreateChild/>
            </div>
        </div>
    )
}

export default AddChild
