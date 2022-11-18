import React from "react";
import "./sidebar.scss"
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import GroupsIcon from '@mui/icons-material/Groups';
import MessageIcon from '@mui/icons-material/Message';
import FeedIcon from '@mui/icons-material/Feed';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import CollectionsIcon from '@mui/icons-material/Collections';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">Przedszkole nr 25</span>
            </div>
            <div className="center">
                <ul>
                    <li>
                        <AccountBoxIcon className="icon"/>
                        <span onClick={() => navigate('/home', { replace: true })}> Profil</span>
                    </li>
                    <li>
                        <FamilyRestroomIcon className="icon"/>
                        <span onClick={() => navigate('/users', { replace: true })}> Rodzice</span>
                    </li>
                    <li>
                        <GroupsIcon className="icon"/>
                        <span  onClick={() => navigate('/groups', { replace: true })}>Grupy</span>
                    </li>
                    <li>
                        <ChildCareIcon className="icon"/>
                        <span  onClick={() => navigate('/children', { replace: true })}>Dzieci</span>
                    </li>
                    <li>
                        <MessageIcon className="icon"/>
                        <span  onClick={() => navigate('/Message', { replace: true })}>Wiadomości</span>
                    </li>
                    <li>
                        <RateReviewIcon className="icon"/>
                        <span  onClick={() => navigate('/SendMessage', { replace: true })}>Utwórz</span>
                    </li>

                    <li>
                        <MarkChatReadIcon className="icon"/>
                        <span  onClick={() => navigate('/SentMessage', { replace: true })}>Wysłane</span>
                    </li>

                    <li>
                        <FeedIcon className="icon"/>
                        <span>Aktualości</span>
                    </li>
                    <li>
                        <SupervisorAccountIcon className="icon"/>
                        <span>Portal rodzica</span>
                    </li>
                    <li>
                        <SchoolIcon className="icon"/>
                        <span>Baza wiedzy</span>
                    </li>
                    <li>
                        <CollectionsIcon className="icon"/>
                        <span>Galeria</span>
                    </li>


                </ul>
            </div>
        </div>
    )
}


export default Sidebar