import FileService from "../gallery/FileService"
import "../gallery/Knowledge.scss"
import Popup_user from "../Home/Popup_user";
import React, {useEffect, useState} from 'react'
import saveAs from 'file-saver'
import EditFile from "../gallery/EditFile";
import FolderService from "./FolderService";
import { ToastContainer, toast } from "react-toastify";
import { withTranslation } from "react-i18next";
import i18next from 'i18next';
import UserContext from "../../components/sidebar/UserContext";
import {useContext} from "react";


const { t } = i18next;
const FolderOther = (props) => {

  const { t } = i18next;

    const [filesInfo, setFilesInfo] = useState([
        {
            id: "",
            name: "",
            hash: "",
            dateAdded: "",
            description: ""
        }
    ])
    
   let {folderId} = props.value
    useEffect(() => {
        const getFiles = async () => {
        FolderService.getFolder(folderId).then((response) => {
            let responseFiles = response.data.fileDataList
            responseFiles.sort(function(a, b) {
                return a.id - b.id;
            });
             // eslint-disable-next-line
            responseFiles.map((file) => {
                if (file.dateAdded != null) 
                    file.dateAdded = (new Date(file.dateAdded)).toISOString().split('T')[0]
            })
            setFilesInfo(responseFiles)     
        }).then({}).catch((reason) => {
            console.log(`axios request failed: ${reason}`);
        })  
    }
        getFiles().then(r => console.log(r))
        // eslint-disable-next-line
    }, [])

    const printFiles = async (file) => {
        FileService.getFile(folderId, file.hash).then((response) => {
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
        FileService.addFiles(folderId, formData)
            .then((response) => {
                if (response.status !== 200) throw new Error(response.status);
                else {
                    let responseFiles = response.data;
                    responseFiles.map((file) => {
                        if (file.dateAdded != null)
                            file.dateAdded = (new Date(file.dateAdded)).toISOString().split('T')[0]
                    });

                    setFilesInfo(filesInfo => [...filesInfo, ...responseFiles]);

                    toast.success(t('success_file_addition'));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteFile = async (file) => {
        const confirmed = window.confirm(t('confirm_deletion') +" " + file.name + "?");
        if (confirmed) {
            FileService.deleteFile(folderId, file.hash)
                .then((response) => {
                    setFilesInfo(filesInfo.filter((refreshFile) => file.id !== refreshFile.id));
                    toast.success (toast.success(t('success_file_deletion')));
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(t('error_file_deletion'));
                });
        }
    };


    const deleteAllFiles = async () => {
        const confirmed = window.confirm(t('confirm_all_files_deletion'));
        if (confirmed) {
            FileService.deleteAllFiles(folderId)
                .then((response) => {
                    setFilesInfo([]);
                    toast.success(t('success_multiple_files_deletion'));
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(t('error_multiple_files_deletion'));
                });
        }
    };



    const checkDataIsNull = (fileDate) => {
        if (fileDate === null) {
            return "Brak daty"
        }

        return fileDate
    }

    const displayHiddentText = (text) => {
        return text;
    }
    const truncateName = (name) => {
        if (name.length > 50) {
            return name.substr(0, 45) + "...";
        }
        return name;
    }
    const[buttonPopup, setButtonPopup] = useState({
        isPop: false,
        fileId: "",
        description: ""
    });
    const currentUser = useContext(UserContext);
    return (
        <div data-testid = 'folder-other' className="scrollable-div">
            <ToastContainer />
            <table className="content-table">
                <thead>
                    <tr className="table-head">
                        <td>{t('file')}</td>
                        <td>{t('date')}</td>
                        <td>{t('description')}</td>
                        {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER") && <td>{t('download')}</td>}
                        {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER") &&   <td>{t('delete')}</td>}
                    </tr>
                </thead>
                <tbody className="body table-body">
                    {filesInfo.map((file) => (
                        <tr key = {file.id}>
                            <td id="tooltip">{truncateName(file.name)}<div id="hiddenText">{displayHiddentText(file.description)}</div></td>
                            <td>{checkDataIsNull(file.dateAdded)}</td>
                            {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER") &&   <td><button type="button" className='btn btn-info' onClick={() => setButtonPopup({isPop: true, fileId: file.id, description: file.description})}>{t('edit')}</button></td>}
                            <td><button size="lg" className="btn btn-primary" onClick={() => printFiles(file)}>{t('download')}</button></td>
                            {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER") &&    <td><button onClick={() => deleteFile(file)} className="btn btn-danger">{t('delete')}</button></td>}
                        </tr>
                    ))}
                    <Popup_user trigger={buttonPopup.isPop} setTrigger={setButtonPopup}><EditFile  {...buttonPopup}/></Popup_user>
                </tbody>
            </table>
            <br />
            {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER") &&    <div className="uploadDiv">
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                 <div className="input23">   <input type="file" className="form-control" id="customFile" name='file' multiple/></div>
                    <p></p>
                    <button type="submit" className="btn btn-primary"> {t('send')}</button>
                </form>
            </div>}

            <div className="deleteAll">
                {(currentUser.role === "ADMIN" || currentUser.role === "TEACHER") &&  <button onClick={() => deleteAllFiles()} className="btn btn-danger btn-lg">{t('delete_all_files')}</button>}
            </div>

        </div>
    );
}

export default withTranslation()(FolderOther);
