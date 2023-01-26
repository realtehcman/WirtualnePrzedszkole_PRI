import FileService from "../gallery/FileService";
import "../gallery/Knowledge.scss";
import {useParams, useNavigate} from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react'
import saveAs from 'file-saver'
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import EditFile from "./EditFile";
import Popup from "../GroupDisplay/Popup";
import current_UserService from "../Home/Current_UserService";


const Knowledge = () => {

    const [filesInfo, setFilesInfo] = useState([
        {
            id: "",
            name: "",
            hash: "",
            dateAdded: "",
            description: ""
        }
    ])

    const KNOWLEDGE_ID = 0

    useEffect(() => {
        getKnowledge()
    },[])

    const [current_user, setCurrent_User] = useState({
        role: '',
    });

    let {isLoggedIn} = current_user.role;


    let {id} = useParams()

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        current_UserService.getCurrent_User(id).then(response => {
            console.log('Response from main API: ',response)
            let current_userData = response.data;
            setCurrent_User({id: current_userData.id, role: current_userData.role})
        });
    }

    const getKnowledge = async () => {
        FileService.getKnowledge().then((response) => {
            let responseFiles = response.data
            responseFiles.sort(function(a, b) {
                return a.id - b.id;
            });
            responseFiles.map((file) => {
                if (file.dateAdded != null)
                    file.dateAdded = (new Date(file.dateAdded)).toISOString().split('T')[0]
            })
            setFilesInfo(responseFiles)
        }).then({}).catch((reason) => {
            console.log(`axios request failed: ${reason}`);
        })

    }


    const printFiles = async (file) => {
        FileService.getFile(KNOWLEDGE_ID, file.hash).then((response) => {
            saveAs(response.data, file.name)
      })
    }

    const handleSubmit = async(event) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);

        const files = event.currentTarget;
        for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
        }
        FileService.addFiles(KNOWLEDGE_ID, formData).then((response) => {
            if (response.status !== 200) throw new Error(response.status);
            else {
                console.log(response.data[0])
                let responseFiles = response.data
                responseFiles.map((file) => {
                    if (file.dateAdded != null)
                        file.dateAdded = (new Date(file.dateAdded)).toISOString().split('T')[0]
                })

                setFilesInfo(filesInfo => [...filesInfo, ...responseFiles])
            }
        })
    }

    const deleteFile = async (file) => {
        FileService.deleteFile(KNOWLEDGE_ID, file.hash).then((response) => {
            setFilesInfo(filesInfo.filter((refreshFile) => file.id !== refreshFile.id))
        })
    }

    const deleteAllFiles = async () => {
        FileService.deleteAllFiles(KNOWLEDGE_ID).then((response) => {
            setFilesInfo([])
        })
    }

    const checkDataIsNull = (fileDate) => {
        if (fileDate === null) {
            return "Brak daty"
        }

        return fileDate
    }

    const displayHiddentText = (text) => {
        return text;
    }

    const[buttonPopup, setButtonPopup] = useState({
        isPop: false,
        fileId: "",
        description: ""
    });

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredFiles = filesInfo.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="scrollable-div">

            <div className="abc">
                <form>
                    <input type="text" placeholder="szukaj plików po nazwie" onChange={handleSearch} />
                </form>
            </div>


            <table className="content-table">
                <thead>
                    <tr className="table-head">
                        <td>Plik</td>
                        <td>Data</td>
                        {current_user.role === "ADMIN" && <td>Opis</td>}
                        <td>Pobierz</td>
                        {current_user.role === "ADMIN" && <td>Usuń</td>}
                    </tr>
                </thead>
                <tbody className="body table-body">
                {filteredFiles.map((file) => (

                    <tr key = {file.id}>
                            <td id="tooltip">{file.name}<td id="hiddenText">{displayHiddentText(file.description)}</td></td>
                            <td>{checkDataIsNull(file.dateAdded)}</td>
                        {current_user.role === "ADMIN" &&    <td><button type="button" className='btn btn-info' onClick={() => setButtonPopup({isPop: true, fileId: file.id, description: file.description})}>Edytuj</button></td>}
                            <td><button size="lg" className="btn btn-primary" onClick={() => printFiles(file)}>Pobierz</button></td>
                        {current_user.role === "ADMIN" && <td><button onClick={() => deleteFile(file)} className="btn btn-danger">Usuń</button></td>}

                        {/* {renderPageLink()} */}
                        </tr>
                    ))}
                    <Popup trigger={buttonPopup.isPop} setTrigger={setButtonPopup}><EditFile  {...buttonPopup}/></Popup>
                </tbody>
            </table>
            <br />
            {current_user.role === "ADMIN" &&      <div className="uploadDiv">
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                 <div className="input23">   <input type="file" className="form-control" id="customFile" name='file' multiple/></div>
                    <p></p>
                    <button type="submit" className="btn btn-primary"> Wyślij</button>
                </form>
            </div>}

            <div className="deleteAll">
                {current_user.role === "ADMIN" && <button onClick={() => deleteAllFiles()} className="btn btn-danger btn-lg">Usuń wszystkie pliki</button>}
            </div>

        </div>
    );
}

export default Knowledge