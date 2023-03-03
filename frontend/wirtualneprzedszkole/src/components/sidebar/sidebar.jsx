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
import FolderIcon from '@mui/icons-material/Folder';
import "./sidebar.scss";
import * as FaIcons from "react-icons/fa";
// import MediaQuery from "react-responsive";
import useWindowDimensions from "./useWindowDimensions.js";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { useTranslation } from "react-i18next";
import UserContext from './UserContext';
import { useContext } from 'react';

const Sidebar = () => {
    const current_user = useContext(UserContext);
    useWindowDimensions();
    useNavigate();
    const {t} = useTranslation();

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
    

    const MenuView = () => {
        if (current_user.role=== "ADMIN" || current_user.role=== "TEACHER"){
            return(
                <div data-testid="sidebar">
                    <li>
                        <Link to={"/home"}>
                            <AccountBoxIcon className="icon" />
                            <span>{t('profile')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/users"}>
                            <FamilyRestroomIcon className="icon" />
                            <span>{t('users')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/groups"}>
                            <GroupsIcon className="icon" />
                            <span>{t('groups')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/children"}>
                            <ChildCareIcon className="icon" />
                            <span>{t('kids')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Kadra"}>
                            <SchoolIcon className="icon" />
                            <span>{t('cadre')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Message"}>
                            <MessageIcon className="icon" />
                            <span>{t('theNews')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/SendMessage"}>
                            <RateReviewIcon className="icon" />
                            <span>{t('create')}</span>
                        </Link>
                    </li>

                    <li>
                        <Link to={"/SentMessage"}>
                            <MarkChatReadIcon className="icon" />
                            <span>{t('sent')}</span>
                        </Link>
                    </li>


                    <li>
                        <Link to={"/Knowledge"}>
                            <LocalLibraryIcon className="icon" />
                            <span>{t('knowledgeBase')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Gallery"}>
                            <CollectionsIcon className="icon" />
                            <span>{t('gallery')}</span>
                        </Link>
                    </li>   <li>
                    <Link to={"/UserManual"} target="_blank">
                        <span>{t('manual')}</span>
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
                            <span>{t('profile')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Message"}>
                            <MessageIcon className="icon" />
                            <span>{t('theNews')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/SendMessage"}>
                            <RateReviewIcon className="icon" />
                            <span>{t('create')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/SentMessage"}>
                            <MarkChatReadIcon className="icon" />
                            <span>{t('sent')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Knowledge"}>
                            <LocalLibraryIcon className="icon" />
                            <span>{t('knowledgeBase')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/ClassFolders"}>
                            <FolderIcon className="icon" />
                            <span>{t('otherFiles')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Gallery"}>
                            <CollectionsIcon className="icon" />
                            <span>{t('gallery')}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/Kadra"}>
                            <SchoolIcon className="icon" />
                            <span>{t('cadre')}</span>
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
                                <span className="logo">{t('kindergarten')}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;