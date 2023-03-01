import React from "react";
import "./UserComponent";
import "./Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import UserComponent from "./UserComponent";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";

const Users = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div data-testid="user" className="users">
      <Sidebar />
      <div data-testid="usersContainer" className="usersContainer">
        <Navbar />
        <UserComponent />
        <button
          className="button"
          onClick={() => navigate("/add-user")}
        >
          {t('add_user')}
        </button>
      </div>
    </div>
  );
};

export default Users;
