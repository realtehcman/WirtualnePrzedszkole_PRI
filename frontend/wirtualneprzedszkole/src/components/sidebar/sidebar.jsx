import { React, useState, useEffect } from "react";
import "./sidebar.scss";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageIcon from "@mui/icons-material/Message";
import FeedIcon from "@mui/icons-material/Feed";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import CollectionsIcon from "@mui/icons-material/Collections";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import RateReviewIcon from "@mui/icons-material/RateReview";
import "./sidebar.scss";
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
  // const screenSize = width;
  // const  = width;

  const navigate = useNavigate();

  var [sidebar, setSidebar] = useState(true);
  //const showSidebar = () => setSidebar(!sidebar);

  const screenSize = useEffect(() => {
    window.addEventListener("resize", () => {
      const myWidth = window.innerWidth;
      console.log("my width :::", myWidth);
    });
  }, [window]);

  useEffect(() => {
    const startWidth = window.innerWidth;
    if (+startWidth < 600) {
      setSidebar(false);
    }
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__wrap">
          <div
            className={
              sidebar
                ? "sidebar__controls"
                : "sidebar__controls sidebar__controls--hidden"
            }
          >
            <button
              className="sidebar__maenu-btn"
              type="button"
              onClick={() => setSidebar(!sidebar)}
            >
              <FaIcons.FaBars />
            </button>
          </div>

          <div className={sidebar ? "sidebar__list" : "sidebar__list--hidden"}>
              <div className="center">
                <ul>
                  <li>
                    <AccountBoxIcon className="icon" />
                    <span onClick={() => navigate("/home", { replace: true })}>
                      {" "}
                      Profil
                    </span>
                  </li>
                  <li>
                    <FamilyRestroomIcon className="icon" />
                    <span onClick={() => navigate("/users", { replace: true })}>
                      {" "}
                      Rodzice
                    </span>
                  </li>
                  <li>
                    <GroupsIcon className="icon" />
                    <span
                      onClick={() => navigate("/groups", { replace: true })}
                    >
                      Grupy
                    </span>
                  </li>
                  <li>
                    <ChildCareIcon className="icon" />
                    <span
                      onClick={() => navigate("/children", { replace: true })}
                    >
                      Dzieci
                    </span>
                  </li>
                  <li>
                    <MessageIcon className="icon" />
                    <span
                      onClick={() => navigate("/Message", { replace: true })}
                    >
                      Wiadomości
                    </span>
                  </li>
                  <li>
                    <RateReviewIcon className="icon" />
                    <span
                      onClick={() =>
                        navigate("/SendMessage", { replace: true })
                      }
                    >
                      Utwórz
                    </span>
                  </li>

                  <li>
                    <MarkChatReadIcon className="icon" />
                    <span
                      onClick={() =>
                        navigate("/SentMessage", { replace: true })
                      }
                    >
                      Wysłane
                    </span>
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
        </div>
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
