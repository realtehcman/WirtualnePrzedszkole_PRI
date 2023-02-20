import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Child from "./Child";

const ChildNavi = () => {
  return (
    <div data-testid="users" className="users">
      <Sidebar />
      <div data-testid="usersContainer" className="usersContainer">
        <Navbar />
        <div className="App_card">
        <Child />
        </div>
      </div>
    </div>
  );
};

export default ChildNavi;
