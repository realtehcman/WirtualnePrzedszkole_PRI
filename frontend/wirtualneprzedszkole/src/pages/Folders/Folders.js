import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import FolderService from './FolderService'
import "./Folders.scss"


const Folders = (props) => {

    const navigate = useNavigate()
    const [folder, setFolder] = useState(
        {
            id: "",
            name: "",
            path: "",
            className: "",
            fileDataList: [{}],
            childrenFolder: [{}],
            parent: {}
        }
    )


    const {id} = props.value

    useEffect(() => {
        const getFolder = async() => {
        FolderService.getFolder(id).then(response => {
            setFolder(response.data)
        })
        }
        getFolder().then(r => console.log(r))
    // eslint-disable-next-line 
    }, [])


    const deleteFolder = async(folderId) => {
        FolderService.deleteFolder(folderId).then((response) => {
            setFolder({childrenFolder: folder.childrenFolder.filter((refreshFolder) => folderId !== refreshFolder.id)})
        })
    }

    const showFolderContent = async(folderId) => {
        FolderService.getFolder(folderId).then((response) => {
            let showFolder = ({id: response.data.id,
            name: response.data.name,
            path: response.data.path,
            className: response.data.className,
            fileDataList: response.data.fileDataList,
            childrenFolder: response.data.childrenFolder,
            parent: response.data.parent})
            if (folder.name === "Other") {
                navigate("/folderOther/" + showFolder.id)
            }
            else {
                navigate("/ViewGallery/" + showFolder.id)
            }
        })
    }

    return (
        <div data-testid="folders">
        <div className="scrollable-div">
            <table className="content-table w-100">
                <thead>
                    <tr className="table-head">
                        <td>Folder</td>
                        <td>Zobacz</td>
                        <td>Usuń</td>
                    </tr>
                </thead>
                <tbody className="body table-body">
                    {folder.childrenFolder.map((item) => (
                        <tr key = {item.id}>
                            <td>{item.name}</td>
                            <td><button onClick={() => showFolderContent(item.id)} className="btn btn-info">Zobacz</button></td>
                            <td><button onClick={() => deleteFolder(item.id)} className="btn btn-danger">Usuń</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />

        </div>
        <div className='text-center'>
        <button
            className="button btn"
            onClick={() => navigate("/addFolder", {state: {folder}})}
        >
            Dodaj Folder
        </button>
        </div>
        </div>
    )
}

export default Folders
