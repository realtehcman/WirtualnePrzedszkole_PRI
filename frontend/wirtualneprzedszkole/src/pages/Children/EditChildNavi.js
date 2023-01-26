import React from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import EditChild from "./EditChild";
import {useNavigate, useParams} from "react-router-dom";

const EditChildNavi = () => {
    let {id} = useParams()
    return (
        <div className="users">
            <Sidebar />
            <div className="usersContainer">
                <Navbar />
                <EditChild  value={id}/>
            </div>
        </div>
    );
};

export default EditChildNavi;
