import { React, useState, useEffect } from "react";
import "./sidebar.scss";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import GroupsIcon from "@mui/icons-material/Groups";
import MessageIcon from "@mui/icons-material/Message";
import SchoolIcon from "@mui/icons-material/School";
import CollectionsIcon from "@mui/icons-material/Collections";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import {useNavigate, Link} from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import RateReviewIcon from "@mui/icons-material/RateReview";
import "./sidebar.scss";
import * as FaIcons from "react-icons/fa";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import MediaQuery from "react-responsive";
import useWindowDimensions from "./useWindowDimensions.js";
import CurrentUserService from "../../pages/Home/CurrentUserService";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const Sidebar = () => {
    useWindowDimensions();
    useNavigate();

    var [sidebar, setSidebar] = useState(true);

    useEffect(() => {
        window.addEventListener("resize", () => {
            const myWidth = window.innerWidth;
            console.log("my width :::", myWidth);
        });
        // eslint-disable-next-line
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


    useEffect(() => {
        const getData = async () => {
            CurrentUserService.getCurrentUser().then(response => {
                console.log('Response from main API: ',response)
                let current_userData = response.data;
                setCurrent_User({id: current_userData.id, role: current_userData.role})
            });
        }

        getData()
    }, [])

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
                            <LocalLibraryIcon className="icon" />
                            <span>Baza wiedzy</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Galeria"}>
                            <CollectionsIcon className="icon" />
                            <span>Galeria</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Kadra"}>
                            <SchoolIcon className="icon" />
                            <span>Kadra</span>
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
                            <span>Użytkownicy </span>
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
                        <Link to={"/Kadra"}>
                            <SchoolIcon className="icon" />
                            <span>Kadra</span>
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
                        <Link to={"/Knowledge"}>
                            <LocalLibraryIcon className="icon" />
                            <span>Baza wiedzy</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Gallery"}>
                            <CollectionsIcon className="icon" />
                            <span>Galeria</span>
                        </Link>
                    </li>   <li>
                    <Link to={"/UserManual"} target="_blank">
                        <span>Instrukcja</span>
                    </Link>

                </li>
                    </div>
            );
        }
    }

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