import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import {useLocation} from "react-router-dom";
import AddFolder from "./AddFolder"


const AddFolderNavi = () => {
    const location = useLocation();

    let showFolder = location.state
  
  return (
    <div data-testid="add-folder-navi" className="users gallery">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <AddFolder {...showFolder}/>
      </div>
    </div>
  );
};

export default AddFolderNavi;
