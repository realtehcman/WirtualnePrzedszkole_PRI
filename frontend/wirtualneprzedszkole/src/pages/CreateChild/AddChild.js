import React from "react";
import '../CreateUser/CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import CreateChild from "./CreateChild";
import { useTranslation } from "react-i18next";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

const AddChild = () => {
    const {t} = useTranslation();
    const currentUser = useContext(UserContext);

    if (currentUser.role === "PARENT" || currentUser.role === "TEACHER") {
        return (
            <div data-testid="group-navi" className="users">
                <Sidebar />
                <div data-testid="usersContainer" className="usersContainer">
                    <Navbar />
                    <p><h1>You don't have permission to access this page.</h1></p>
                </div>
            </div>
        );
    }
    return (
        <div className="addusers">
            <Sidebar/>
            <div className="addusersContainer">
                <Navbar/>
                <CreateChild t={t}/>
            </div>
        </div>
    )
}

export default AddChild
