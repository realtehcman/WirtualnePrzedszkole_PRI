import React, { useEffect, useRef, useState } from "react";
import "../User/Users.scss"
import { useNavigate } from "react-router-dom";
import GroupComponent from "./GroupComponent";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useTranslation } from "react-i18next";

const GroupNavi = () => {
    const [btnHeight, setBtnHeight] = useState(0);
    const [navHeight, setNavHeight] = useState(0);

    const navigate = useNavigate();
    const { t } = useTranslation();
    const navRef = useRef(null);
    const ref = useRef(null)

    useEffect(() => {
        setBtnHeight(ref.current.clientHeight);
        setNavHeight(navRef.current.clientHeight);
    }, [btnHeight, navHeight]);

    return (
        <div data-testid="group-navi" className="users">
            <Sidebar />
            <div className="usersContainer">
                <div ref={navRef}>
                    <Navbar />
                </div>
                <div className="App_card" style={{height: `calc(100% - ${navHeight}px)`}}>
                    <div style={{ height: `calc(100% - ${btnHeight}px)` }} className="overflow-hidden" >
                        <GroupComponent t={t} />
                    </div>
                    <div ref={ref} className="text-center mt-2">
                        <button data-testid="button" className="button btn" onClick={() => navigate('/add-group')}>{t('add_group')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupNavi;
