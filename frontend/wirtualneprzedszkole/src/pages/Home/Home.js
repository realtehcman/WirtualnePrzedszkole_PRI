import React from "react";
import "./Home.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import {useNavigate} from "react-router-dom";



const Home = () => {
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">

                <Navbar/>
                <h1>Work in progress :(</h1>
            </div>
        </div>
    )
}

export default Home