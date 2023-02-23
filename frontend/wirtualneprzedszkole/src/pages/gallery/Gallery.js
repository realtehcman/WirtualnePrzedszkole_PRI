import React from 'react'
import GalleryService from "./GalleryService";
import "../GroupDisplay/Popup.css"
import "../User/Table.scss";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast.success("Galeria usunięta");
        } catch (error) {
            console.error(error);
            toast.error("Błąd usuwania galerii");
        }
    }


    componentDidMount() {
        GalleryService.getFolders().then((response) => {
            this.setState({ all_folders: response.data });
        });
    }

    handleSearch(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
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
                    <input type="text" placeholder="Wyszukaj Galerie" onChange={this.handleSearch} />

                </div>
                <ToastContainer />
                <div className="table-container">
                <table className="content-table">
                    <thead>
                    <tr className="table-head">
                        <td>Grupa</td>
                        <td>Nazwa Galerii</td>
                        <td>Akcje</td>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredFolders.map((folder) => (
                        <tr key={folder.id}>
                            <td>{folder.className}</td>
                            <td>{folder.path.split("Photos/")[1]}</td>
                            <td className="foobar">
                                <Navi value={folder.id} />
                                <Navi2 value={folder.id} />
                                <button
                                    onClick={() => {
                                        if (window.confirm("Czy na pewno chcesz usunąć tę galerię?")) {
                                            this.deleteFolder(folder.id);
                                        }
                                    }}
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
            </div>
        );
    }

}
export default Gallery
