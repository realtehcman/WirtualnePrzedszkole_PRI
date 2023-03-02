import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./ChildrenComponent";
import ChildrenComponent from "./ChildrenComponent";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChildrenNavi = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div data-testid="children-navi" className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <div className="scrollable-div">
          <ChildrenComponent />
        </div>
        <button
            data-testid="add-child-button"
          className="button"
          onClick={() => navigate("/add-child")}
        >
          {t('add_child')}
        </button>
      </div>
    </div>
  );
};

export default ChildrenNavi;
