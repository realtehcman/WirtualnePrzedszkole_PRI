import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import {useParams} from "react-router-dom";
import UserChild from "./UserChild"


const UserChildNavi = () => {
    let {id} = useParams()
    return (
        <div data-testid="user-child-navi" className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <div className="App_card">
                    <UserChild value={id}/>
                </div>
            </div>
        </div>
    )
}

export default UserChildNavi
