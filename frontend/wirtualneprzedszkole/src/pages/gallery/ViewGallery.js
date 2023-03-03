import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import '../../../src/Styles.scss';
import Popup from '../GroupDisplay/Popup';
import FolderService from '../Folders/FolderService';
import FileService from './FileService';
import saveAs from 'file-saver'
import { useTranslation } from "react-i18next";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewGallery = () => {
    const current_user = useContext(UserContext);
    const {t} = useTranslation();
    const [photos, setPhotos] = useState([]);
    const [allPhotos, setAllPhotos] = useState([]);
    const [deletePhotoPopup, setDeletePhotoPopup] = useState({
        isPop: false,
        img: {}
    });
    const [addPhotoPopup, setAddPhotoPopup] = useState(false);
    const [selectPhotos, setSelectedPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [photosPerPage] = useState(12);

    const totalPages = Math.ceil(photos.length / photosPerPage);
    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [newFile, setNewFile] = useState(
        {
            name: "",
            path: "",
            className: "",
            fileDataList: [{}],
        }
    )
    const [folderName, setFolderName] = useState()
    const [openPhotoPopup, setOpenPhotoPopup] = useState({
        isPop: false,
        img: {},
        name: ""
    })
    const calculateTotalPages = (photos) => {
        return Math.ceil(photos.length / 12);
    };

    let { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            FolderService.getFolder(id).then((response) => {
                setFolderName(response.data.name);
                let galleryData = response.data.fileDataList;
                setAllPhotos(galleryData);
                Promise.all(galleryData.map((el) => getPhoto(el))).then((result) => {
                    setPhotos(result);
                });
            });
        };
        getData().then((r) => console.log(r));
        // eslint-disable-next-line
    }, []);

    const getCurrentPagePhotos = () => {
        const startIndex = (currentPage - 1) * 12;
        const endIndex = startIndex + 12;
        return photos.slice(startIndex, endIndex);
    };


    const getPhoto = async (element) => {
        let x = await FileService.getFile(id, element.hash).then(res => {
            let urlCreator = window.URL || window.webkitURL;
            return urlCreator.createObjectURL(res.data)
        })
        return [x, element]
    }

    const addFiles = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const files = event.currentTarget;
        for (let i = 1; i < files.length; i++) {
            if (files[i].type === "image/jpeg") {
                formData.append('file', files[i]);
            }
        }

        FileService.addFiles(id, formData)
            .then((res) => {
                if (res.status !== 200) {
                    console.log(res + 'Unsuccessfully uploaded');
                    toast.error(t('Failed_to_upload_photos'));
                } else {
                    Promise.all(res.data.map((el) => getPhoto(el))).then((result) => {
                        console.log(result);
                        setPhotos((photos) => [...photos, ...result]);
                        toast.success(t('Photos_uploaded_successfully'));
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(t('Failed_to_upload_photos'));
            });
        setAddPhotoPopup(false);
    };

    const deleteFile = (e) => {
        console.log(e);
        FileService.deleteFile(id, e.hash)
            .then((res) => {
                if (res.status !== 200) {
                    console.log(res + 'Unsuccessfully delete');
                    toast.error(t('Failed_to_delete_photos'));
                } else {
                    setPhotos(
                        photos.filter((refreshFile) => e.id !== refreshFile[1].id)
                    );
                    toast.success(t('success_file_deletion'));
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(t('Failed_to_delete_photos'));
            });
        setDeletePhotoPopup({ isPop: false, img: {} });
    };

    const downloadPhoto = (photo, name) => {
        saveAs(photo, name);
        setOpenPhotoPopup({ isPop: false, img: {}, name: '' });
        toast.success(t('Photos_downloaded_successfully'));
    };

    const downloadFolder = (folderName) => {
        FileService.downloadFolder(id)
            .then((response) => {
                const href = URL.createObjectURL(response.data);

                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', folderName + '.zip'); //or any other extension
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(href);
                toast.success(t('Folder_downloaded_successfully'));
            })
            .catch((error) => {
                console.log(error);
                toast.error(t('Folder_downloaded_failed'));
            });
    };


    return (
        <div> <ToastContainer />
            {/* {photos} */}
            <h1>{folderName}</h1>    {(current_user.role === "ADMIN" ||  current_user.role === "TEACHER")  &&
                <div className='d-flex align-items-center justify-content-end custom_postion'>
                    <button
                        onClick={() => setAddPhotoPopup(true)}
                        className="btn btn-info"
                    >
                        {t('add_photos')}
                    </button>
                    <button
                        onClick={() => downloadFolder(folderName)}
                        className="btn btn-info"
                    >
                        {t('download_all')}
                    </button>
                </div>}
            <div className='gallery_container'>
                <div className="gallery_container">
                    {getCurrentPagePhotos().map((photo) => (
                            <div className='gallery_img'  key={photo[1].id}>
                                {(current_user.role === "ADMIN" ||  current_user.role === "TEACHER")  && <button type="button" onClick={() => setDeletePhotoPopup({isPop: true, img: photo[1]})}>
                                    <ClearIcon className="icon" />
                                </button>}

                                <img src={photo[0]} alt={photo[1].name} onClick={() => setOpenPhotoPopup({isPop: true, img: photo[0], name: photo[1].name})}/>
                            </div>

                        )
                    )}
                </div>
            </div>



            <div className="delete_photo_popup">
                <Popup trigger={deletePhotoPopup.isPop} setTrigger={setDeletePhotoPopup}>
                    <h3 className='text-center mb-2'>{t('delete_image')}</h3>
                    <p className='text-center py-3'>{t('are_you_sure_you_want_to_delete_image')}</p>
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-primary' onClick={() => setDeletePhotoPopup({isPop: false, img: {}})}>Anuluj</button>
                        <button className='btn btn-danger' onClick={() => deleteFile(deletePhotoPopup.img)}>Usuń</button>
                    </div>
                </Popup>
            </div>

            <div className="add_photo_popup">
                <Popup trigger={addPhotoPopup} setTrigger={setAddPhotoPopup}>
                    <h3 className='text-center mb-2'>{t('add_photos')}</h3>
                    <form onSubmit={addFiles} encType='multipart/form-data'>
                        <div className="uploadDiv2">
                            <div className="input25">   <input type="file" className="form-control" id="customFile" name='file' multiple/></div>
                        </div>
                        <div className="form-but">
                            <button className="button">{t('save')}</button>
                        </div>
                    </form>
                </Popup>
            </div>


            <div className="open_photo_popup">
                <Popup trigger={openPhotoPopup.isPop} setTrigger={setOpenPhotoPopup}>
                    <img src={openPhotoPopup.img} alt={openPhotoPopup.name}/>
                    <div>
                        <button className='btn btn-primary' onClick={() => downloadPhoto(openPhotoPopup.img, openPhotoPopup.name)}>{t('download')}</button>
                    </div>
                </Popup>
            </div>




            <div className='d-flex justify-content-center'>Strony: {currentPage}/{totalPages}</div>

            <div className='d-flex justify-content-center'>
                <button
                    className='btn btn-info'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Poprzednia strona
                </button>
                <button
                    className='btn btn-info'
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Następna strona
                </button>
            </div>
        </div>

    );

}
export default ViewGallery


