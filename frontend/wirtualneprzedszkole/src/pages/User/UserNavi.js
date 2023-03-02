import React from "react";
import "./Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import User from "./User"
import {useParams} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

const UserNavi = () => {
    let {id} = useParams()
    const currentUser = useContext(UserContext);

    if (currentUser.role === "PARENT") {
        return (
            <div data-testid="users" className="users">
                <Sidebar />
                <div data-testid="usersContainer" className="usersContainer">
                    <Navbar />
                    <p><h1>You don't have permission to access this page.</h1></p>
                </div>
            </div>
        );
    }

    return (
        <div data-testid="users" className="users">
            <Sidebar/>
            <div data-testid="usersContainer" className="usersContainer">
                <Navbar/>
                <User value={id}/>
            </div>
        </div>
    )
}

export default UserNavi
