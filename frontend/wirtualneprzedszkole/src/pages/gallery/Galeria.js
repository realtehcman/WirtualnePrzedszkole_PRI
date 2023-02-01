import React from 'react'
import GalleryService from "../gallery/GalleryService";
import "../GroupDisplay/Popup.css"
import "../User/Table.scss";
import {useNavigate} from "react-router-dom";


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



class Galeria extends React.Component {

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
            <div data-testid="galeria" className="scrollable-div">
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
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        );
    }
}
export default Galeria
