import React from "react";
import "../User/Users.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Kadra from "./Kadra"
import {useParams} from "react-router-dom";

const KadraNavi = () => {
    let {id} = useParams()
    return (
        <div className="users">
            <Sidebar/>
            <div className="usersContainer">
                <Navbar/>
                <div className="App_card">
                <Kadra value={id}/>
                </div>
            </div>
        </div>
    )
}

export default KadraNavi