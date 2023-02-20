import React from "react";
import "./UserComponent";
import "./Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import UserComponent from "./UserComponent";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Users = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  return (
    <div data-testid="user" className="users">
      <Sidebar />
      <div data-testid="usersContainer" className="usersContainer">
        <Navbar />
        <div className="App_card">
          <UserComponent t={t} />
         <div className="text-center mt-4">
         <button className="button btn" onClick={() => navigate("/add-user")}>{t('add_user')}
          </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
