import React, {Component} from "react";
import GalleryService from "../gallery/GalleryService";
import "../CreateUser/CreateUser.scss";
import i18next from 'i18next';
import { withTranslation } from "react-i18next";
const { t } = i18next;

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
      const { t } = i18next;

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
                                        placeholder={t('group')}
                                        name={t('description')}
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
                                    <button className="button2">{t('save')}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(CreateGallery);
