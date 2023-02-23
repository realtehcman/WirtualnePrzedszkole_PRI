import React, { useEffect, useRef, useState } from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Knowledge from "./Knowledge";


const KnowledgeNavi = () => {
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);

  useEffect(() => {
    setNavHeight(navRef.current.clientHeight);
  }, [navHeight]);

  return (
    <div className="users gallery">
      <Sidebar />
      <div className="usersContainer">
        <div ref={navRef}>
          <Navbar />
        </div>
        <div className="App_card" style={{ height: `calc(100% - ${navHeight}px)` }}>
          <Knowledge />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeNavi;
