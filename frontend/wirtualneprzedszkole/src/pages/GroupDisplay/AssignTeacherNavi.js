import React from "react";

import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import AssignTeacher from "./AssignTeacher";
import {useParams} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

const AssignTeacherNavi = () => {
    let id = useParams()
    const currentUser = useContext(UserContext);

    if (currentUser.role === "PARENT") {
        return (
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
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
                <AssignTeacher value={id}/>
            </div>
        </div>
    )
}

export default AssignTeacherNavi
