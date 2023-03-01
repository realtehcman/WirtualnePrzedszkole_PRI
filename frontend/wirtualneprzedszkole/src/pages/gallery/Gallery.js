import React from 'react'
import GalleryService from "./GalleryService";
import "../GroupDisplay/Popup.css"
import "../User/Table.scss";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FolderService from "../Folders/FolderService"
import { withTranslation } from "react-i18next";
import i18next from 'i18next';
const { t } = i18next;


const Navi2 = (props) => {

    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/home/" + props.value)}
            className="btn btn-info"
        >
            {t('add_photos')}
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
            {t('view')}
        </button>

    );
};



class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_folders: [],
            searchTerm: "",
        };
        this.deleteFolder = this.deleteFolder.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    async deleteFolder(id) {
        try {
            const response = await GalleryService.deleteFolder(id);
            this.setState({
                all_folders: this.state.all_folders.filter((all_folders) => all_folders.id !== id),
            });
            toast.success(t("success_gallery_deletion"));
        } catch (error) {
            console.error(error);
            toast.error(t("error_gallery_deletion"));
        }
    }


    componentDidMount() {
        FolderService.getFolders().then((response) => {
            this.setState({ all_folders: response.data });
        });
    }

    handleSearch(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { t } = i18next;

        const filteredFolders = this.state.all_folders.filter((folder) => {
            const pathMatch = folder.path.includes("Photos/");
            const searchTerms = this.state.searchTerm.toLowerCase().split(" ");
            const nameMatch = searchTerms.every(term => (
                folder.className.toLowerCase().includes(term) ||
                folder.path.toLowerCase().includes(term)
            ));
            return pathMatch && nameMatch;
        });

        return (
            <div data-testid="gallery" className="scrollable-div">
                <div className="abc">
                    <input type="text" placeholder={t('search_galleries')} onChange={this.handleSearch} />

                </div>
                <ToastContainer />
                <div className="table-container">
                <table className="content-table">
                    <thead>
                    <tr className="table-head">
                        <td>{t('group')}</td>
                        <td>{t('gallery_name')}</td>
                        <td>{t('actions')}</td>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredFolders.map((folder) => (
                        <tr key={folder.id}>
                            <td id="td--gallery">{folder.className}</td>
                            <td id="td--gallery">{folder.path.split("Photos/")[1]}</td>
                            <td id="td--gallery" className="foobar">
                                <Navi value={folder.id} />
                                <Navi2 value={folder.id} />
                                <button
                                    onClick={() => {
                                        if (window.confirm(t("confirm_gallery_deletion"))) {
                                            this.deleteFolder(folder.id);
                                        }
                                    }}
                                    className="btn button2 btn-danger"
                                >
                                    {t('delete')}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }

}

export default withTranslation()(Gallery);
