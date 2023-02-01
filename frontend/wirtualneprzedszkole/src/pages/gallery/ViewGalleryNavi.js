import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import ViewGallery from "./ViewGallery";
import { useNavigate, useParams } from "react-router-dom";

const ViewGalleryNavi = () => {
    const navigate = useNavigate();
    return (
        <div className="users gallery">
            <Sidebar />
            <div className="usersContainer">
                <Navbar />
                <ViewGallery />
            </div>
        </div>
    );
};

export default ViewGalleryNavi;
