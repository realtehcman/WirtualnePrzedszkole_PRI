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
                <Kadra value={id}/>
            </div>
        </div>
    )
}

export default KadraNavi