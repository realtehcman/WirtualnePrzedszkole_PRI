import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Galeria from "./Galeria";
import { useNavigate, useParams } from "react-router-dom";

const GalleryNavi = () => {
    const navigate = useNavigate();
    return (
        <div className="users gallery">
            <Sidebar />
            <div className="usersContainer">
                <Navbar />
                <Galeria />
            </div>
        </div>
    );
};

export default GalleryNavi;
