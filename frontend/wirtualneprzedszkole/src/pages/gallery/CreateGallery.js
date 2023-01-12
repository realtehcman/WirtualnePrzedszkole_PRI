import React, { Component } from "react";
import GalleryService from "./GalleryService";
import "../CreateUser/CreateUser.scss";
import { Link } from "react-router-dom";
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBFile } from 'mdb-react-ui-kit';



class CreateGallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
             file: [],
            folder: "",
        };
        // this.changeFileHandler = this.changeFileHandler.bind(this);
        this.changeFolderHandler = this.changeFolderHandler.bind(this);
        this.saveGroup = this.saveGroup.bind(this);

    }
    saveGroup = (e) => {
        e.preventDefault();
        let group = ({

                folder: this.state.folder,
                file: this.state.file,
            }
        );
        GalleryService.UploadMultiFiles(group).then((response) => {
            if (response.data != null) {
                this.setState(this.state);
            }
        });
    };
    // changeFileHandler = (event) => {
    //     this.setState({ file: event.target.value });
    // };
    changeFileHandler = (files) => {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file)
    }

    changeFolderHandler = (event) => {
        this.setState({ folder: event.target.value });
    };



    render() {
        return (
            <div className="formContainer">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="form-body">
                            <form onSubmit={(e) =>{
                                this.saveGroup(e);
                            } }>
                                <div className="form-group">
                                    <input
                                        placeholder="Grupa"
                                        name="Opis"
                                        required
                                        type="text"
                                        value={this.state.folder}
                                        onChange={this.changeFolderHandler}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="file"
                                        value={this.state.file}
                                        onChange={(e) => this.changeFileHandler(e.target.files)}
                                    />
                                </div>
                                <div className="form-but">

                                </div>
                                <div className="form-but">
                                    <button className="button2">Zapisz</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateGallery;
