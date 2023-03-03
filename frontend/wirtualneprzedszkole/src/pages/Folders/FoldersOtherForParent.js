import React from 'react'
import "../GroupDisplay/Popup.css"
import "../User/Table.scss";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FolderService from "../Folders/FolderService"
import { withTranslation } from "react-i18next";
import i18next from 'i18next';
const { t } = i18next;


const Navi = (props) => {

    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/folderOther/" + props.value)}
            className="btn btn-info"
        >
            {t('view')}
        </button>

    );
};



class FoldersOtherForParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all_folders: [],
            searchTerm: "",
        };
        this.handleSearch = this.handleSearch.bind(this);
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
            const pathMatch = folder.path.includes("Other/");
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
                    <input type="text" placeholder={t('serachFolder')} onChange={this.handleSearch} />

                </div>
                <ToastContainer />
                <div className="table-container">
                <table className="content-table">
                    <thead>
                    <tr className="table-head">
                        <td>{t('folder')}</td>
                        <td>{t('look')}</td>
                        <td>{t('actions')}</td>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredFolders.map((folder) => (
                        <tr key={folder.id}>
                            <td id="td--gallery">{folder.className}</td>
                            <td id="td--gallery">{folder.path.split("Other/")[1]}</td>
                            <td id="td--gallery" className="foobar">
                                <Navi value={folder.id} />
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

export default withTranslation()(FoldersOtherForParent);