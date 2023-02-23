import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import FolderService from './FolderService'
import '../CreateUser/CreateUser.scss'
import './AddFolder.scss'
import FileService from "../gallery/FileService"

const AddFolder = (props) => {
    const navigate = useNavigate()
    const [newFolder, setNewFolder] = useState(
        {
            name: "",
            path: "",
            className: "",
            fileDataList: [{}],
        }
    )

    let { folder } = props


    const addFolder = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const files = event.currentTarget;
        for (let i = 1; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        newFolder.path = folder.path + "/" + newFolder.name
        newFolder.className = folder.className
        let temp = formData.getAll("file")[0].size
        FolderService.addNewFolder(newFolder).then(response => {
            if (response.status !== 200) throw new Error(response.status);
            else {
                if (temp > 0)
                    FileService.addFiles(response.data.id, formData).then((res) => {
                        if (res.status !== 200) throw new Error(res.status);

                    })
                navigate(-1)
            }
        })

    }

    return (
        <div data-testid="add-folder">
            <div className='form-body'>
                <form onSubmit={addFolder} encType='multipart/form-data'>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <div className='form-group'>
                                <input placeholder='Nazwa Folderu' name="Nazwa Folderu" className='form-control'
                                    onChange={e => setNewFolder({ name: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div>
                                <div className="form-group">
                                    <input type="file" className="form-control" id="customFile" name='file' multiple />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-12 text-center mt-4'>
                        <button type="button" className="button btn w-auto">Zapisz</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFolder
