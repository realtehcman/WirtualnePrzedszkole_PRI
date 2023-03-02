import React from "react";
import '../CreateUser/CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import CreateGroup from "./CreateGroup";
import { useTranslation } from "react-i18next";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

const AddGroup = () => {
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
        <div data-testid="addusers" className="addusers">
            <Sidebar/>
            <div data-testid="addusersContainer" className="addusersContainer">
                <Navbar/>
                <CreateGroup t={t}/>
            </div>
        </div>
    )
}

export default AddGroup
