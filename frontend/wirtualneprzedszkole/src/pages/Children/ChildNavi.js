import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Child from "./Child";
import { useNavigate } from "react-router-dom";

const ChildNavi = () => {
  const navigate = useNavigate();
  return (
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <Child />
      </div>
    </div>
  );
};

export default ChildNavi;
