import FileService from "../gallery/FileService";
import "../gallery/Knowledge.scss";
import React, { useEffect, useState } from 'react'
import saveAs from 'file-saver'
import EditFile from "./EditFile";
import Popup from "../GroupDisplay/Popup";
import SortIcon from '@mui/icons-material/Sort';
import HeightIcon from '@mui/icons-material/Height';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import currentUserService from "../Home/CurrentUserService";
import { useTranslation } from "react-i18next";

const Knowledge = () => {
    const {t} = useTranslation();

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




    const [currentUser, setCurrentUser] = useState({
        role: '',
    });

    useEffect(() => {
        getData().then(r => console.log(r))
        // eslint-disable-next-line
    }, [])


    const getData = async () => {
        currentUserService.getCurrentUsers().then(response => {
            let currentUserData = response.data;
            setCurrentUser({ id: currentUserData.id, role: currentUserData.role })
        });
    }

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
                // eslint-disable-next-line
                responseFiles.map((file) => {
                    if (file.dateAdded != null)
                        file.dateAdded = (new Date(file.dateAdded)).toISOString().split('T')[0]
                });
                setFilesInfo(responseFiles);
            }).catch((reason) => {
                console.log(`axios request failed: ${reason}`);
            });
        };
        getKnowledge();
    }, [sortBy, sortOrder]);


    const printFiles = async (file) => {
        FileService.getFile(KNOWLEDGE_ID, file.hash).then((response) => {
            saveAs(response.data, file.name)
        })
    }

    const handleSubmit = async (event) => {
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
                // eslint-disable-next-line
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

    const [buttonPopup, setButtonPopup] = useState({
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
        <div data-testid="knowledge">
            <ToastContainer />
            <div className="mb-4">
                <form>
                    <input type="text" className="form-control border-0" placeholder={t('search_for_files_by_name')} onChange={handleSearch} />
                </form>
            </div>

            <div className="scrollable-div">
                <table className="content-table w-100">
                    <thead>
                        <tr className="table-head">
                            <td>
                                <SortIcon className="icon" onClick={handleSortByName} />
                                <span className="text">{t('file')}</span>
                            </td>

                            <td className="icon-text">
                                <HeightIcon className="icon" onClick={handleSortByDate} />
                                <span className="text">{t('data')}</span>
                            </td>

                            {currentUser.role === "ADMIN" && <td>{t('description')}</td>}
                            <td>{t('download')}</td>
                            {currentUser.role === "ADMIN" && <td>{t('delete')}</td>}
                        </tr>
                    </thead>
                    <tbody className="body table-body">
                        {filteredFiles.map((file) => (

                            <tr key={file.id}>
                                <td id="tooltip">{file.name}<td id="hiddenText">{displayHiddentText(file.description)}</td></td>
                                <td>{checkDataIsNull(file.dateAdded)}</td>
                                {currentUser.role === "ADMIN" && <td><button type="button" className='btn btn-info' onClick={() => setButtonPopup({ isPop: true, fileId: file.id, description: file.description })}>{t('edit')}</button></td>}
                                <td><button size="lg" className="btn btn-primary" onClick={() => printFiles(file)}>{t('download')}</button></td>
                                {currentUser.role === "ADMIN" && <td><button onClick={() => deleteFile(file)} className="btn btn-danger">{t('delete')}</button></td>}

                            </tr>
                        ))}
                        <Popup trigger={buttonPopup.isPop} setTrigger={setButtonPopup}><EditFile  {...buttonPopup} /></Popup>
                    </tbody>
                </table>
            </div>

            <br />
            {currentUser.role === "ADMIN" && 
            <div>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div> 
                          <input type="file" className="form-control" id="customFile" name='file' multiple />
                    </div>
                </form>
            </div>}

            <div className="d-md-flex align-items-center justify-content-between mt-5">
                <button type="submit" className="btn btn_global">{t('send')}</button>
                {currentUser.role === "ADMIN" && <button onClick={() => deleteAllFiles()} className="btn btn-danger btn-lg">{t('delete_all_files')}</button>}
            </div>

        </div>
    );
}

export default Knowledge
