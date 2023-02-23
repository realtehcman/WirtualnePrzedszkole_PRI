import React, { useEffect, useRef, useState } from "react";
import "./UserComponent";
import "./Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import UserComponent from "./UserComponent";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Users = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [btnHeight, setBtnHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  const ref = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    setBtnHeight(ref.current.clientHeight);
    setNavHeight(navRef.current.clientHeight);
  },[btnHeight, navHeight]);

  return (
    <div data-testid="user" className="users">
      <Sidebar />
      <div data-testid="usersContainer" className="usersContainer">
        <div ref={navRef}>
          <Navbar />
        </div>
        
        <div className="App_card" style={{height: `calc(100% - ${navHeight}px)`}}>
          <div style={{height: `calc(100% - ${btnHeight}px)`}} className="overflow-hidden" >
            <UserComponent t={t} />
          </div>
          <div ref={ref} className="text-center mt-2">
            <button className="button btn" onClick={() => navigate("/add-user")}>{t('add_user')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
