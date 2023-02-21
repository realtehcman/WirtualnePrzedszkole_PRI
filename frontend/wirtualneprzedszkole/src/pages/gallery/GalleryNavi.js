import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Gallery from "./Gallery";
import { useTranslation } from "react-i18next";

const GalleryNavi = () => {
    const {t} = useTranslation();
    return (
        <div className="users gallery">
            <Sidebar />
            <div className="usersContainer">
                <Navbar />
                <div className="App_card">
                <Gallery t={t} />
                </div>
            </div>
        </div>
    );
};

export default GalleryNavi;
