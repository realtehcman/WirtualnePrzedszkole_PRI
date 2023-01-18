import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AddFolder from "./AddFolder"


const AddFolderNavi = () => {
    const location = useLocation();

    let folder = location.state
  
  return (
    <div className="users gallery">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <AddFolder {...folder}/>
      </div>
    </div>
  );
};

export default AddFolderNavi;