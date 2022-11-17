import React, { useState, useEffect } from "react";
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
// import MediaQuery from "react-responsive";
import { isMobile } from "react-device-detect";
import { BrowserView, MobileView } from "react-device-detect";
import useWindowDimensions from "./useWindowDimensions.js";

const Sidebar = () => {
  const { height, width } = useWindowDimensions();
  const phoneMaxWidth = 480;
  const screenSize = width;

  const navigate = useNavigate();
  var [sidebar, setSidebar] = useState(true);
  //const showSidebar = () => setSidebar(!sidebar);

  var width1 = useEffect(() => {
    window.addEventListener("resize", () => {
      const myWidth = window.innerWidth;
      console.log("my width :::", myWidth);
    });
  }, [window]);

  return (
    <>
      {/* <MobileView> */}
      <div className="">
        <span
          onClick={() => navigate("#", { replace: true })}
          className="menu-bars"
        >
          <FaIcons.FaBars onClick={() => setSidebar(!sidebar)} />
          <hr />
        </span>

        <div className={sidebar ? "sidebar" : "sidebar-hidden"}>
          <div className="center">{/* <div className="navbar"></div> */}</div>
          <div className="center">
            <ul>
              <li>
                <FamilyRestroomIcon className="icon" />
                <span
                  onClick={() => {
                    if (screenSize < phoneMaxWidth) {
                      setSidebar(!sidebar);
                      navigate("/users", { replace: true });
                    }
                    navigate("/users", { replace: true });
                  }}
                >
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
            <div className="top">
              <span className="logo">Przedszkole nr 25</span>
            </div>
          </div>
        </div>
      </div>
      {/* </MobileView> */}
    </>
  );
};

const SidebarPhone = () => {
  if (isMobile) {
    return <div> This content is available only on mobile</div>;
  }
  return <div> content... </div>;
};

export default Sidebar;
