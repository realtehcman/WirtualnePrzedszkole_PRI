import React from "react";
import '../CreateUser/CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import CreateChild from "./CreateChild";
import { useTranslation } from "react-i18next";

const AddChild = () => {
    const {t} = useTranslation();
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
