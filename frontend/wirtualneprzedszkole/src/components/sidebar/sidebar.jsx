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
import { useNavigate, Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import RateReviewIcon from "@mui/icons-material/RateReview";
import "./sidebar.scss";
import * as FaIcons from "react-icons/fa";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
                  {/*  className="center" */}
                  <Link to={"/home"}>
                    <AccountBoxIcon className="icon" />
                    {/* <span onClick={() => navigate("/home", { replace: true })}> */}{" "}
                    <span>Profil</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/users"}>
                    <FamilyRestroomIcon className="icon" />
                    <span> Rodzice</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/groups"}>
                    <GroupsIcon className="icon" />
                    <span>Grupy</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/children"}>
                    <ChildCareIcon className="icon" />
                    <span>Dzieci</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/Message"}>
                    <MessageIcon className="icon" />
                    <span>Wiadomości</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/SendMessage"}>
                    <RateReviewIcon className="icon" />
                    <span>Utwórz</span>
                  </Link>
                </li>

                <li>
                  <Link to={"/SentMessage"}>
                    <MarkChatReadIcon className="icon" />
                    <span>Wysłane</span>
                  </Link>
                </li>

                <li>
                  {/* TODO */}
                  <Link to={"#"}>
                    <FeedIcon className="icon" />
                    <span>Aktualości</span>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <SupervisorAccountIcon className="icon" />
                    <span>Portal rodzica</span>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <SchoolIcon className="icon" />
                    <span>Baza wiedzy</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/Gallery"}>
                    <CollectionsIcon className="icon" />
                    <span>Galeria</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/AddGallery"}>
                    <AddPhotoAlternateIcon className="icon" />
                    <span>Dodaj zdjęcia</span>
                  </Link>
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
