import React, { useState } from "react";
import "./sidebar.scss";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageIcon from "@mui/icons-material/Message";
import FeedIcon from "@mui/icons-material/Feed";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import CollectionsIcon from "@mui/icons-material/Collections";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="sidebar">
      <div className="center">
        <div className="navbar">
          <span onClick={() => navigate("/users", { replace: true })}>
            <FaIcons.FaBars value={{size: 42}} onClick={showSidebar} />
          </span>
        </div>
      </div>
      <hr />
      <div className="top">
        <span className="logo">Przedszkole nr 25</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <FamilyRestroomIcon className="icon" />
            <span onClick={() => navigate("/users", { replace: true })}>
              {" "}
              Rodzice
            </span>
          </li>
          <li>
            <GroupsIcon className="icon" />
            <span onClick={() => navigate("/groups", { replace: true })}>
              Grupy
            </span>
          </li>
          <li>
            <ChildCareIcon className="icon" />
            <span onClick={() => navigate("/children", { replace: true })}>
              Dzieci
            </span>
          </li>
          <li>
            <MessageIcon className="icon" />
            <span>Wiadomości</span>
          </li>
          <li>
            <FeedIcon className="icon" />
            <span>Aktualości</span>
          </li>
          <li>
            <SupervisorAccountIcon className="icon" />
            <span>Portal rodzica</span>
          </li>
          <li>
            <SchoolIcon className="icon" />
            <span>Baza wiedzy</span>
          </li>
          <li>
            <CollectionsIcon className="icon" />
            <span>Galeria</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
