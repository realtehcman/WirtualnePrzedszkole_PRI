import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Knowledge from "./Knowledge";


const KnowledgeNavi = () => {

  return (
    <div className="users gallery">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
       <div className="App_card">
       <Knowledge />
       </div>
      </div>
    </div>
  );
};

export default KnowledgeNavi;
