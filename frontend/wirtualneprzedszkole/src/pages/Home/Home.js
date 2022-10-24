import React from "react";
import "./Home.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"

const Home = () => {
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar/>
                <h1>WITAJ</h1>
            </div>
        </div>
    )
}

export default Home