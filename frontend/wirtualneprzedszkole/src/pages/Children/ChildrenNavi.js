import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./ChildrenComponent";
import ChildrenComponent from "./ChildrenComponent";
import { useNavigate } from "react-router-dom";

const ChildrenNavi = () => {
  const navigate = useNavigate();
  return (
    <div data-testid="children-navi" className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <div className="App_card">
          <ChildrenComponent />
          <div className="text-center mt-4">
            <button data-testid="add-child-button" className="button btn" onClick={() => navigate("/add-child")}>
              Dodaj Dziecko
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChildrenNavi;
