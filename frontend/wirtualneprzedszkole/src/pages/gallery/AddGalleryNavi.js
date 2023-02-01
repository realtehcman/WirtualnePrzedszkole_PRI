import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import AddGallery from "./AddGallery";
import { useNavigate, useParams } from "react-router-dom";

const AddGalleryNavi = () => {
    const navigate = useNavigate();
    return (
        <div className="users gallery">
            <Sidebar />
            <div className="usersContainer">
                <Navbar />
                <AddGallery />
            </div>
        </div>
    );
};

export default AddGalleryNavi;
