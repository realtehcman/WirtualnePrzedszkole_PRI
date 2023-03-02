import React, {useEffect, useState} from "react";
import UserService from "../User/UserService";
import ChildrenService from "../Children/ChildrenService";
import {useNavigate, useParams} from "react-router-dom";
import "../User/Table.scss";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";
import { useTranslation } from "react-i18next";

const UserChild = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    let {id} = useParams();
    const [children, setChild] = useState([
        {
            id: "",
            name: "",
            lastName: "",
            parents: [],
        },
    ]);
    const current_user = useContext(UserContext);
    const getData = async () => {
        ChildrenService.getChildren().then((response) => {
            let ChildData = response.data;
            let childrenData = ChildData.map((it) => {
                return {
                    id: it.id,
                    name: it.name,
                    lastName: it.lastName,
                    parents: it.parents,
                };
            });
            setChild(childrenData);
        });
    };
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredchildren = children.filter(child =>
        (child.name.toLowerCase() + ' ' + child.lastName.toLowerCase()).includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        getData();
    }, []);

    const putUser = async (id, child) => {
        UserService.addChildToUser(id, child).then((response) => {
            if (response.status !== 200) throw new Error(response.status);
            else {
                navigate("/user/" + id);
            }
        });
    };
    if (current_user.role === "PARENT") {
        return <div><h1>Error 403: You don't have permission to access this page.</h1></div>;
    }
    return (
        <div data-testid="user-child">
            <div className="abc">
            <form>
                <input type="text" placeholder="szukaj" onChange={handleSearch} />
            </form>
        </div>
            <table className="content-table">

                <thead>
                <tr className="table-head">
                    <td>{t('name')}</td>
                    <td>{t('last_name')}</td>
                    <td>{t('actions')}</td>
                </tr>
                </thead>
                <tbody className="body">
                {filteredchildren.map((child) => (
                    <tr key={child.id}>
                        <td id="td--addchildren">{child.name}</td>
                        <td id="td--addchildren">{child.lastName}</td>
                        <td id="td--addchildren">
                            <button
                                onClick={() => putUser(id, child)}
                                className="btn btn-danger"
                            >
                                {t('assign_child')}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserChild;
