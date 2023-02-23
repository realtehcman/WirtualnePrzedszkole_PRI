import React, { useEffect, useRef, useState } from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./ChildrenComponent";
import ChildrenComponent from "./ChildrenComponent";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ChildrenNavi = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const [btnHeight, setBtnHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const ref = useRef(null);
  const navRef = useRef(null);


  useEffect(() => {
    setBtnHeight(ref.current.clientHeight);
    setNavHeight(navRef.current.clientHeight);
  },[btnHeight, navHeight]);

  return (
    <div data-testid="children-navi" className="users">
      <Sidebar />
      <div className="usersContainer">
        <div ref={navRef}>
          <Navbar />
        </div>
        <div className="App_card" style={{height: `calc(100% - ${navHeight}px)`}}>
          <div style={{height: `calc(100% - ${btnHeight}px)`}} className="overflow-hidden" >
            <ChildrenComponent t={t} />
          </div>
          <div ref={ref} className="text-center mt-2">
            <button data-testid="add-child-button" className="button btn" onClick={() => navigate("/add-child")}>
            {t('add_child')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChildrenNavi;
