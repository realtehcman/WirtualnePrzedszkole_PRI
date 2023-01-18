import React, { useEffect, useState} from 'react'
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
        getFolder()
    },[])

    const getFolder = async() => {
        FolderService.getFolder(id).then(response => {
            setFolder(response.data)
        })
    }

    return (
        <>
        <div className="scrollable-div">
            <table className="content-table">
                <thead>
                    <tr className="table-head">
                        <td>Folder</td>
                        <td>Usuń</td>
                    </tr>
                </thead>
                <tbody className="body table-body">
                    {folder.childrenFolder.map((item) => (
                        <tr key = {item.id}>
                            <td>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />

        </div>
        <button
            className="button"
            onClick={() => navigate("/addFolder", {state: {folder}})}
        >
            Dodaj Folder
        </button>
        </>
    )
}

export default Folders