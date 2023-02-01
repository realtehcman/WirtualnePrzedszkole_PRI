import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import SentMessage from "./SentMessage"
import {useParams} from "react-router-dom";

const SentMessageNavi = () => {
    let {id} = useParams()
    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <SentMessage value={id}/>
            </div>
        </div>
    )
}

export default SentMessageNavi