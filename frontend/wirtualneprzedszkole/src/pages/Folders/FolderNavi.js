import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import {useParams} from "react-router-dom";
import Folders from "./Folders"


const FolderNavi = () => {

  let folderId = useParams() 
  
  return (
    <div className="users gallery">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <Folders value={folderId} data-testid="folders"/>
      </div>
    </div>
  );
};

export default FolderNavi;
