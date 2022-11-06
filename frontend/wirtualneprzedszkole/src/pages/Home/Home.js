import React from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import img from "../../images/Kids-now-spend-twice-as-much-time-playing-indoors-than-outdoors-850x500.png";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {/* <h1>Work in progress :(</h1> */}

        <section className="home__info">
          <h1 className="home__title">Work in progress :(</h1>
          <img
            className="home__banner"
            src={img}
            width="500"
            height="500"
          ></img>
        </section>
      </div>
    </div>
  );
};

export default Home;
