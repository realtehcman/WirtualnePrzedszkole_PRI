import React, { useEffect, useRef, useState } from "react";
import "../User/Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Gallery from "./Gallery";
import { useTranslation } from "react-i18next";

const GalleryNavi = () => {
    const [navHeight, setNavHeight] = useState(0);
    const { t } = useTranslation();
    const navRef = useRef(null);

    useEffect(() => {
        setNavHeight(navRef.current.clientHeight);
    }, [navHeight]);

    return (
        <div className="users gallery">
            <Sidebar />
            <div className="usersContainer">
                <div ref={navRef}>
                    <Navbar />
                </div>
                <div className="App_card" style={{ height: `calc(100% - ${navHeight}px)` }}>
                    <Gallery t={t} />
                </div>
            </div>
        </div>
    );
};

export default GalleryNavi;
