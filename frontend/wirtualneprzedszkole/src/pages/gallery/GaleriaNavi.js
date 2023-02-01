import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Galeria from "./Galeria";

const GalleryNavi = () => {
    return (
        <div data-testid="galeria-navi" className="users gallery">
            <Sidebar />
            <div className="usersContainer">
                <Navbar />
                <Galeria />
            </div>
        </div>
    );
};

export default GalleryNavi;
