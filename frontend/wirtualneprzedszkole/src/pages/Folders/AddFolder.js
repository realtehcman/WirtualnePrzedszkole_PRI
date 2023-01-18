import React, { useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import FolderService from './FolderService'
import '../CreateUser/CreateUser.scss'
import './AddFolder.scss'
import FileService from "../gallery/FileService"

const AddFolder = (props) => {
    const [newFolder, setNewFolder] = useState(
        {
            name: "",
            path: "",
            className: "",
            fileDataList: [{}],
        }
    )
    
    let {folder} = props


    const addFolder = async(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const files = event.currentTarget;
        for (let i = 1; i < files.length; i++) {
            formData.append('file', files[i]);
        }
        newFolder.path = folder.path + "/" + newFolder.name
        newFolder.className = folder.className
        let temp = formData.getAll("file").length
        console.log(temp)
        FolderService.addNewFolder(newFolder).then(response => {
            console.log(response.data)
            if (temp > 3)
                FileService.addFiles(response.data.id, formData)
        })
    }

    return (
        <div className='formContainer'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <div className='form-body'>
                        <form onSubmit={addFolder} encType='multipart/form-data'>
                            <div className='form-group'>
                                <input placeholder='Nazwa Folderu' name="Nazwa Folderu" className='"form-control' 
                                onChange={e => setNewFolder({name: e.target.value})}/>
                            </div>
                            <div className="uploadDiv2">
                                    <div className="input25">   <input type="file" className="form-control" id="customFile" name='file' multiple/></div>
                            </div>
                            <div className="form-but">
                                    <button className="button">Zapisz</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddFolder