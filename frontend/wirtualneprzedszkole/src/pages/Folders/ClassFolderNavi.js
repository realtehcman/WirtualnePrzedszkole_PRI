import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import {useParams} from "react-router-dom";
import FoldersOtherForParent from "./FoldersOtherForParent";

const ClassFolderNavi = () => {

    let folderId = useParams()

  return (
    <div className="users gallery">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <FoldersOtherForParent value={folderId} />
      </div>
    </div>
  );
};

export default ClassFolderNavi;