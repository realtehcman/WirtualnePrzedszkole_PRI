import React from "react";
import "./UserComponent";
import "./Users.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import UserComponent from "./UserComponent";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

const Users = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);

    if (currentUser.role === "PARENT") {
        return (
            <div data-testid="user" className="users">
                <Sidebar />
                <div data-testid="usersContainer" className="usersContainer">
                <Navbar />
                <p><h1>You don't have permission to access this page.</h1></p>
            </div>
            </div>
        );
    }

    return (
        <div data-testid="user" className="users">
            <Sidebar />
            <div data-testid="usersContainer" className="usersContainer">
                <Navbar />
                <UserComponent />
                {currentUser.role === "ADMIN" && <button
                    className="button"
                    onClick={() => navigate("/add-user")}
                >
                    {t('add_user')}
                </button>}
            </div>
        </div>
    );
};

export default Users;
