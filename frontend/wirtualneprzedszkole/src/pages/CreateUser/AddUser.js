import React from "react";
import './CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import CreateUser from "./CreateUser";
import { useTranslation } from "react-i18next";

const AddUser = () => {
    const {t} = useTranslation();

    return (
        <div className="addusers">
            <Sidebar/>
            <div className="addusersContainer">
                <Navbar/>
                <CreateUser t={t} />
            </div>
        </div>
    )
}

export default AddUser
