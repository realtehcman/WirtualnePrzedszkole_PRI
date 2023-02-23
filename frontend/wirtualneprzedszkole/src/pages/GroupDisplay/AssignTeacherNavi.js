import React from "react";

import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import AssignTeacher from "./AssignTeacher";
import {useParams} from "react-router-dom";

const AssignTeacherNavi = () => {
    let id = useParams()
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <div className="App_card">
                <AssignTeacher value={id}/>
                </div>
            </div>
        </div>
    )
}

export default AssignTeacherNavi
