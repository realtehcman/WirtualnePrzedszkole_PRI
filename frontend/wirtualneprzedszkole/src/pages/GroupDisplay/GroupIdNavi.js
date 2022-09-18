import React from "react";
import "../Home/Home.scss"

import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Group from "./Group"
import {useParams} from "react-router-dom";

const UserNavi = () => {
    let {id} = useParams()
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

export default UserNavi