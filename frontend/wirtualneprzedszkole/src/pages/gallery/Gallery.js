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
            {props.t('add_photos')}
        </button>

    );
};

const Navi = (props) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/ViewGallery/" + props.value)}
            className="btn btn-info me-2 my-lg-2"
        >
            {props.t('view')}
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
        const {t} = this.props

        return (
            <div data-testid = 'gallery' className="scrollable-div maxArea">
                <table className="content-table w-100">
                    <thead>
                    <tr className="table-head">
                        <td>{t('id')}</td>
                        <td>{t('name')}</td>
                        <td>{t('path')}</td>
                        <td>{t('class')}</td>
                        <td>{t('actions')}</td>

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
                                <Navi value={all_folders.id} t={t} />
                                <Navi2 value={all_folders.id} t={t} />

                            </td>
                            <td>  <button
                                onClick={() => this.deleteFolder(all_folders.id)}
                                className="btn button2 btn-danger"
                            >
                                {t('delete')}
                            </button>  </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        );
    }
}
export default Gallery
