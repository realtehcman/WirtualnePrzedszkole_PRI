import React from "react";
import "./sidebar.scss"
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import GroupsIcon from '@mui/icons-material/Groups';
import MessageIcon from '@mui/icons-material/Message';
import FeedIcon from '@mui/icons-material/Feed';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import CollectionsIcon from '@mui/icons-material/Collections';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">Przedszkole nr 25</span>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <li>
                        <FamilyRestroomIcon className="icon"/>
                        <span onClick={() => navigate('/users', { replace: true })}> Rodzice</span>
                    </li>
                    <li>
                        <GroupsIcon className="icon"/>
                        <span>Grupy</span>
                    </li>
                    <li>
                        <MessageIcon className="icon"/>
                        <span>Wiadomości</span>
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
                    <li>
                        <RestaurantIcon className="icon"/>
                        <span>Jadłospis</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default Sidebar