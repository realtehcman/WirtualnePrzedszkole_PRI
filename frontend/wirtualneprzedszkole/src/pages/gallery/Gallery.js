import React from 'react'
import GalleryService from "./GalleryService";
import "../GroupDisplay/Popup.css"
import "../User/Table.scss";
import {useNavigate} from "react-router-dom";

const Navi2 = (props) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/home/" + props.value)}
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
            onClick={() => navigate("/ViewGallery/" + props.value)}
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
        });
    }


    render() {


        return (
            <div data-testid = 'gallery' className="scrollable-div">
                <table className="content-table">
                    <thead>
                    <tr className="table-head">
                        <td>Grupa</td>
                        <td>Nazwa Galerii</td>
                        <td>Akcje</td>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.all_folders.filter((folder) => folder.path.includes("Photos"))

                        .map((folder) => (
                            <tr key={folder.id}>
                                <td>{folder.className}</td>
                                <td>{folder.path.split("Photos/")[1]}</td>

                                <td className="foobar">
                                    <Navi value={folder.id} />
                                    <Navi2 value={folder.id} />


                                    <button
                                        onClick={() => this.deleteFolder(folder.id)}
                                        className="btn button2 btn-danger"
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        );
    }
}
export default Gallery
