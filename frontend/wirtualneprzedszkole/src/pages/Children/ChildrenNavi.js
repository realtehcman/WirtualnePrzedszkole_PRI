import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./ChildrenComponent";
import ChildrenComponent from "./ChildrenComponent";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

const ChildrenNavi = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
    const currentUser = useContext(UserContext);

    if (currentUser.role === "PARENT") {
        return (
            <div data-testid="group-navi" className="users">
                <Sidebar />
                <div data-testid="usersContainer" className="usersContainer">
                    <Navbar />
                    <p><h1>You don't have permission to access this page.</h1></p>
                </div>
            </div>
        );
    }
  return (
    <div data-testid="children-navi" className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <div className="scrollable-div">
          <ChildrenComponent />
        </div>
          {currentUser.role === "ADMIN" &&  <button
            data-testid="add-child-button"
          className="button"
          onClick={() => navigate("/add-child")}
        >
        {t('add_child')}
        </button>}
      </div>
    </div>
  );
};

export default ChildrenNavi;
