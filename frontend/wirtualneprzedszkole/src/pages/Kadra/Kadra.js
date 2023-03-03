import React, { useState, useEffect } from "react";
import UserService from "../User/UserService";
import "./Kadra.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileService from "../gallery/FileService";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import nophoto from "../../images/nophoto.jpg"

function Kadra() {
    const { t } = useTranslation();

    const [users, setUsers] = useState([]);
    const [userAvatars, setUserAvatars] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let { id } = useParams();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await UserService.getUsers();
                const users = response.data;
                const filteredUsers = users.filter((user) => user.role === "TEACHER");
                setUsers(filteredUsers);

                const avatars = await Promise.all(filteredUsers.map(async (user) => {
                    const avatarr = await getUserAvatar(user.id, user.picture);
                    return avatarr;
                }));
                setUserAvatars(avatars);
                setFilteredUsers(filteredUsers);
            } catch (error) {
                console.error("Error while fetching users:", error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchAvatars = async () => {
            const avatars = await Promise.all(filteredUsers.map(async (user) => {
                const avatarr = await getUserAvatar(user.id, user.picture);
                return avatarr;
            }));
            setUserAvatars(avatars);
        };
        fetchAvatars();
    }, [filteredUsers]);

    const getUserAvatar = async (userId, picture) => {
        if (picture !== undefined) {
            let response = await FileService.getFile(-1, picture);
            let urlCreator = window.URL || window.webkitURL;
            return urlCreator.createObjectURL(response.data);
        } else {
            return nophoto;
        }
    };

    useEffect(() => {
        const filteredUsers = users.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.email &&
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.name.toLowerCase() + " " + user.lastName.toLowerCase()).includes(
                    searchTerm.toLowerCase()
                )
        );
        setFilteredUsers(filteredUsers);
    }, [users, searchTerm]);

    return (
        <div className="scrollable-div">
            <div className="table-body32">
                <ToastContainer />
                <div className="abc">
                    <input
                        type="text"
                            placeholder={t('search')}
                        onChange={handleSearch}
                    />
                </div>
                <table className="content-table32">
                    <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id}>
                            <td id="td--message32">
                                <img
                                    src={userAvatars[index]}
                                    alt=""
                                    className="rounded-circle mt-5"
                                    width="150px"
                                />
                                <br /> <br />
                                {t('name')}: {user.name}<br/>{t('last_name')}: {user.lastName} <br /> <br /> {t('email')}: ({user.email})
                                <br /> <br />
                                {t('phone_no')}: {user.phoneNumber}
                                <br /> <br />
                                {t('about_me')}: <br />
                                {user.opis}
                                <br /> <br />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Kadra;
