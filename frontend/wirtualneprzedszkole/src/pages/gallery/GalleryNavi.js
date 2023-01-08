import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Gallery from "./Gallery";
import AddGallery from "./AddGallery.jsx";
import { useNavigate, useParams } from "react-router-dom";

const GalleryNavi = () => {
  const navigate = useNavigate();
  return (
    <div className="gallery">
      <Sidebar />
      <div className="usersContainer">
        <AddGallery />
        <Navbar />
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryNavi;
