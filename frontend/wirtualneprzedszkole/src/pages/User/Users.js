import React from "react";
import "./UserComponent";
import "./Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import UserComponent from "./UserComponent";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  return (
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <UserComponent />
        <button
          className="button"
          onClick={() => navigate("/add-user"/* , { replace: true } */)}
        >
          Dodaj Rodzica
        </button>
      </div>
    </div>
  );
};

export default Users;
