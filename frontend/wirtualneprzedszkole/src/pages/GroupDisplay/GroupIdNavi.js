import React, { useEffect, useRef, useState } from "react";

import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Group from "./Group"
import {useParams} from "react-router-dom";

const GroupIdNavi = () => {
    let {id} = useParams()
    const [navHeight, setNavHeight] = useState(0);
    const navRef = useRef(null);

    useEffect(() => {
        setNavHeight(navRef.current.clientHeight);
    }, [navHeight]);
    return (
        <div className="home">
            <Sidebar/>
            <div className="homeContainer">
                <div ref={navRef}>
                    <Navbar />
                </div>
                <div className="App_card" style={{ height: `calc(100% - ${navHeight}px)` }}>
                <Group value={id}/>
                </div>
            </div>
        </div>
    )
}

export default GroupIdNavi
