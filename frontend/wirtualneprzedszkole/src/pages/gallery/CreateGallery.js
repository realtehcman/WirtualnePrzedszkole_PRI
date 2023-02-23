import React, { Component } from "react";
import GalleryService from "../gallery/GalleryService";
import "../CreateUser/CreateUser.scss";


class CreateGallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: [],
            folder: "",
        };
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
    changeFileHandler = (files) => {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file)
    }

    changeFolderHandler = (event) => {
        this.setState({ folder: event.target.value });
    };



    render() {
        const {t} = this.props

        return (
            <div className="App_card">
                <div className="form-body">
                    <form onSubmit={(e) => {
                        this.saveGroup(e);
                    }}>
                        <div className="form-group">
                            <input
                                placeholder={t('group')}
                                name="Opis"
                                required
                                type="text"
                                className="form-control border-0"
                                value={this.state.folder}
                                onChange={this.changeFolderHandler}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="file"
                                className="form-control border-0"
                                value={this.state.file}
                                onChange={(e) => this.changeFileHandler(e.target.files)}
                            />
                        </div>
                        <div className="form-but mt-4 text-center">
                            <button className="button btn w-auto">{t('save')}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateGallery;
