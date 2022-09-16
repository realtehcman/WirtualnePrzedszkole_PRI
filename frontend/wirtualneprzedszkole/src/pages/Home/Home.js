import React from "react";
import "./Home.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import LoginButton from "../Login/LoginButton";

const Home = () => {
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <LoginButton/>
            </div>
        </div>
    )
}

export default Home