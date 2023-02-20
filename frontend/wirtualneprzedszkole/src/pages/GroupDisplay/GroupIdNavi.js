import React from "react";

import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Group from "./Group"
import {useParams} from "react-router-dom";

const GroupIdNavi = () => {
    let {id} = useParams()
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="App_card">
                <Group value={id}/>
                </div>
            </div>
        </div>
    )
}

export default GroupIdNavi
