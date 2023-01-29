import {React, useEffect, useState} from "react";
import "./sidebar.scss";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageIcon from "@mui/icons-material/Message";
import FeedIcon from "@mui/icons-material/Feed";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import CollectionsIcon from "@mui/icons-material/Collections";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import {Link, useParams} from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import RateReviewIcon from "@mui/icons-material/RateReview";
import * as FaIcons from "react-icons/fa";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import MediaQuery from "react-responsive";
import useWindowDimensions from "./useWindowDimensions.js";
import currentUserService from "../../pages/Home/CurrentUserService";


const Sidebar = () => {
  const { height, width } = useWindowDimensions();

  const phoneMaxWidth = 480;
  // const screenSize = width;
  // const  = width;

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



  const [current_user, setCurrent_User] = useState({
    role: '',
  });

  let {isLoggedIn} = current_user.role;


  let {id} = useParams()

  useEffect(() => {
    getData().then(() => console.log('Data is loaded'))
  },[])

  const getData = async () => {
    currentUserService.getCurrentUsers(id).then(response => {
      console.log('Response from main API: ',response)
      let current_userData = response.data;
      setCurrent_User({id: current_userData.id, role: current_userData.role})
    });
  }

  const MenuView = () => {
    if (current_user.role=== "PARENT" ){
      return(
        <div data-testid="sidebar">
          <li>
            <Link to={"/home"}>
              <AccountBoxIcon className="icon" />
              <span>Profil</span>
            </Link>
          </li>
          <li>
            <Link to={"/Message"}>
              <MessageIcon className="icon" />
              <span>Wiadomości</span>
            </Link>
          </li>

          <li>
            <Link to={"/Knowledge"}>
              <SchoolIcon className="icon" />
              <span>Baza wiedzy</span>
            </Link>
          </li>
          <li>
            <Link to={"/Galeria"}>
              <CollectionsIcon className="icon" />
              <span>Galeria</span>
            </Link>
          </li>
        </div>
    );
    }
    else
    {
      return(
        <div data-testid="sidebar">

          <li>
            <Link to={"/home"}>
              <AccountBoxIcon className="icon" />
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
            <Link to={"/Knowledge"}>
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
              <span>Dodaj pliki</span>
            </Link>
          </li> </div>
      );
    }
  }


  const[buttonPopup, setButtonPopup] = useState(false);

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
                <ul>{MenuView()}</ul>

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
export default Sidebar;
