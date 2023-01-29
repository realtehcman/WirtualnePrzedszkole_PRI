import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import {useParams} from "react-router-dom";
import FolderOther from "./FolderOther"


const FolderOtherNavi = () => {

    let folderId = useParams()

    return (
        <div data-testid="folder-other-navi" className="users gallery">
            <Sidebar />
            <div className="usersContainer">
                <Navbar />
                <FolderOther value={folderId}/>
            </div>
        </div>
    );
};

export default FolderOtherNavi;
