import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import AddGallery from "./AddGallery";

const AddGalleryNavi = () => {
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
