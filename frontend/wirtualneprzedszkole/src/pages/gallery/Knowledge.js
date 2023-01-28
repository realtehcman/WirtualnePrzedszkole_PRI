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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SortIcon from '@mui/icons-material/Sort';
import HeightIcon from '@mui/icons-material/Height';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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



    const [current_user, setCurrent_User] = useState({
        role: '',
    });

    let {isLoggedIn} = current_user.role;

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

    let {id} = useParams()

    const [sortBy, setSortBy] = useState("id");

    const [sortOrder, setSortOrder] = useState("asc");

    const handleSortByName = () => {
        setSortBy("name");
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }

    const handleSortByDate = () => {
        setSortBy("dateAdded");
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }

    useEffect(() => {
        getKnowledge();
    }, [sortBy, sortOrder]);



    const getKnowledge = async () => {
        FileService.getKnowledge().then((response) => {
            let responseFiles = response.data;
            if (sortBy === "name") {
                responseFiles.sort((a, b) => {
                    if (sortOrder === "asc") {
                        return (a.name > b.name) ? 1 : -1;
                    } else {
                        return (a.name < b.name) ? 1 : -1;
                    }
                });
            } else if (sortBy === "dateAdded") {
                responseFiles.sort((a, b) => {
                    if (sortOrder === "asc") {
                        return new Date(a.dateAdded) - new Date(b.dateAdded);
                    } else {
                        return new Date(b.dateAdded) - new Date(a.dateAdded);
                    }
                });
            } else {
                responseFiles.sort((a, b) => a.id - b.id);
            }
            responseFiles.map((file) => {
                if (file.dateAdded != null)
                    file.dateAdded = (new Date(file.dateAdded)).toISOString().split('T')[0]
            });
            setFilesInfo(responseFiles);
        }).catch((reason) => {
            console.log(`axios request failed: ${reason}`);
        });
    };


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
        try {
            const response = await FileService.addFiles(KNOWLEDGE_ID, formData);
            if (response.status === 200) {
                console.log(response.data[0])
                let responseFiles = response.data
                responseFiles.map((file) => {
                    if (file.dateAdded != null)
                        file.dateAdded = (new Date(file.dateAdded)).toISOString().split('T')[0]
                })
                setFilesInfo(filesInfo => [...filesInfo, ...responseFiles])
                toast.success("Pliki zostały pomyślnie dodane");
            }
        } catch (error) {
            toast.error("Wystąpił błąd podczas dodawania plików");
        }
    }

    const deleteFile = async (file) => {
        const confirm = window.confirm("Czy na pewno chcesz usunąć plik: " + file.name);
        if (confirm) {
            FileService.deleteFile(KNOWLEDGE_ID, file.hash)
                .then((response) => {
                    setFilesInfo(filesInfo.filter((refreshFile) => file.id !== refreshFile.id));
                    toast.success("Plik " + file.name + " został pomyślnie usunięty!");
                })
                .catch(error => {
                    toast.error("Wystąpił błąd podczas usuwania pliku!");
                });
        }
    }

    const deleteAllFiles = async () => {
        const confirm = window.confirm("Czy na pewno chcesz usunąć wszystkie pliki?");
        if (confirm) {
            FileService.deleteAllFiles(KNOWLEDGE_ID)
                .then((response) => {
                    setFilesInfo([]);
                    toast.success("Pliki zostały pomyślnie usunięte!");
                })
                .catch(error => {
                    toast.error("Wystąpił błąd podczas usuwania plików!");
                });
        }
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
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.dateAdded.toString().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="scrollable-div">
            <ToastContainer />
            <div className="abc">
                <form>
                    <input type="text" placeholder="szukaj plików po nazwie" onChange={handleSearch} />
                </form>
            </div>


            <table className="content-table">
                <thead>
                    <tr className="table-head">
                        <td>
                            <SortIcon className="icon" onClick={handleSortByName}/>
                            <span className="text">Plik</span>
                        </td>

                        <td className="icon-text">
                            <HeightIcon className="icon" onClick={handleSortByDate}/>
                            <span className="text">Data</span>
                        </td>

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