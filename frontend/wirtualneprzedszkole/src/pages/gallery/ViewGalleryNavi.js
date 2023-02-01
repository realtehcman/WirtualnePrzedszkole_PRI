import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import ViewGallery from "./ViewGallery";

const ViewGalleryNavi = () => {
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
