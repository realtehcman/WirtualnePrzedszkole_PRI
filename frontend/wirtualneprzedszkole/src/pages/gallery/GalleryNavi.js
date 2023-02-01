import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Gallery from "./Gallery";

const GalleryNavi = () => {
    return (
        <div className="users gallery">
            <Sidebar />
            <div className="usersContainer">
                <Navbar />
                <Gallery />
            </div>
        </div>
    );
};

export default GalleryNavi;
