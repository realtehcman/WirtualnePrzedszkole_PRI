import React from "react";
import '../CreateUser/CreateUser.scss'
import Sidebar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import CreateGallery from "./CreateGallery";

const AddGallery = () => {
    const navigate = useNavigate();
    return (
        <div className="addusers">

            <div className="addusersContainer">

                <CreateGallery/>
            </div>
        </div>
    )
}

export default AddGallery