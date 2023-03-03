//add localization
import React from "react";

import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Group from "./Group"
import {useParams} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

const GroupIdNavi = () => {
    let {id} = useParams()
    const currentUser = useContext(UserContext);

    if (currentUser.role === "PARENT") {
        return (
            <div data-testid="group-navi" className="users">
                <Sidebar />
                <div data-testid="usersContainer" className="usersContainer">
                    <Navbar />
                    <p><h1>You don't have permission to access this page.</h1></p>
                </div>
            </div>
        );
    }
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <Group value={id}/>
            </div>
        </div>
    )
}

export default GroupIdNavi
