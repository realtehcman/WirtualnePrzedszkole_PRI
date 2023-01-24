import React, { useEffect, useState }from 'react'
import GalleryService from "./GalleryService";
import "../GroupDisplay/Popup.css"
import "../User/Table.scss";
import {useNavigate, useParams} from "react-router-dom";
import EditCurrent_User from "../Home/EditCurrent_User";
import Popup from "../GroupDisplay/Popup";
import current_UserService from "../Home/Current_UserService";

const Navi2 = (props) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/home/" + props.value/* , { replace: true } */)}
            className="btn btn-info"
        >
            Dodaj zdjęcia
        </button>

    );
};

const Navi = (props) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/ViewGallery/" + props.value, { replace: true })}
            className="btn btn-info"
        >
            Wyświetl
        </button>

    );
};



class Gallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            all_folders: [],
        };
        this.deleteFolder = this.deleteFolder.bind(this);
    }

    loger() {
        console.log(this.state);
    }

    deleteFolder(id) {
        GalleryService.deleteFolder(id).then((response) => {
            this.setState({
                all_folders: this.state.all_folders.filter((all_folders) => all_folders.id !== id),
            });
        });
    }

    componentDidMount() {
        GalleryService.getFolders().then((response) => {
            this.setState({ all_folders: response.data });
            this.loger();
        });
    }


    render() {


        return (
            <div className="scrollable-div">
                <table className="content-table">
                    <thead>
                    <tr className="table-head">
                        <td>Id</td>
                        <td>nazwa:</td>
                        <td>sciezka:</td>
                        <td>klasa</td>
                        <td>Akcje</td>

                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.all_folders.map((all_folders) => (
                        <tr key={all_folders.id}>
                            <td>{all_folders.id}</td>
                            <td>{all_folders.name}</td>
                            <td>{all_folders.path}</td>
                            <td>{all_folders.className}</td>

                            <td className="foobar">
                                <Navi value={all_folders.id} />
                                <Navi2 value={all_folders.id} />

                            </td>
                            <td>  <button2
                                onClick={() => this.deleteFolder(all_folders.id)}
                                className="btn btn-danger"
                            >
                                Usuń
                            </button2>  </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        );
    }
}
export default Gallery