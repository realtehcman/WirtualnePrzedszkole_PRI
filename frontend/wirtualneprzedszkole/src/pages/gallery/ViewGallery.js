import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import GalleryService from "../gallery/GalleryService";
import "../User/Table.scss";
import Masonry from 'react-masonry-css'
import ClearIcon from '@mui/icons-material/Clear';
import '../../../src/Styles.scss';
import Popup from '../GroupDisplay/Popup';
import CreateGallery from './CreateGallery';
import FolderService from '../Folders/FolderService';
import FileService from './FileService';

const ViewGallery = () => {
    const [photos, setPhotos] = useState([]);

    const [allPhotos, setAllPhotos] = useState([]);

    const [deletePhotoPopup, setDeletePhotoPopup] = useState({
        isPop: false,
        img: {}
    });
    const [addPhotoPopup, setAddPhotoPopup] = useState(false);
    const [selectPhotos, setSelectedPhotos] = useState([]);

    const [newFile, setNewFile] = useState(
        {
            name: "",
            path: "",
            className: "",
            fileDataList: [{}],
        }
    )

    let { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            FolderService.getFolder(id).then((response) => {
                // let galleryData = response.data;
                let galleryData = response.data.fileDataList;

                setAllPhotos(galleryData);
                Promise.all(galleryData.map(el => getPhoto(el))).then(result => {
                    setPhotos(result)
                })
               
            });
        };
        getData().then(r => console.log(r));
        // eslint-disable-next-line
    }, []);

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
            formData.append('file', files[i]);
        }

        FileService.addFiles(id, formData).then((res) => {
            if (res.status !== 200){
                console.log(res + "Unsuccessfully uploaded");
            }
            else {
                Promise.all(res.data.map(el => getPhoto(el))).then(result => {
                    console.log(result)
                    setPhotos(photos => [...photos, ...result])
                })
                
            }
        })
        setAddPhotoPopup(false);
    }

    const deleteFile = (e) => {
        console.log(e)
        FileService.deleteFile(id, e.hash)
        .then((res) => {
            if (res.status !== 200){
                console.log(res + "Unsuccessfully delete");
            }
            else {
                setPhotos(photos.filter((refreshFile) => e.id !== refreshFile[1].id));     
            }
        })
        setDeletePhotoPopup({isPop: false, img: {}});
    }

    return (
        <div>
            {/* {photos} */}

            <div className='gallery_container px-4 py-4'>
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {photos.map((photo) => (
                        <div className='gallery_img position-relative'  key={photo[1].id}>
                            <button type="button" className='btn btn-info del_gallery_img mx-1 my-1 px-0 py-0' onClick={() => setDeletePhotoPopup({isPop: true, img: photo[1]})}>
                                <ClearIcon className="icon mx-0" />
                            </button>
                        
                            <img src={photo[0]} alt={photo[1].name}/>
                        </div>
                        
                    )
                    )}
                </Masonry>
            </div>

            <div className="delete_photo_popup">
                <Popup trigger={deletePhotoPopup.isPop} setTrigger={setDeletePhotoPopup}>
                    <h3 className='text-center mb-2'>Usuń Obraz</h3>
                    <p className='text-center py-3'>Czy na pewno chcesz usunąć ten obraz?</p>
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-primary' onClick={() => setDeletePhotoPopup({isPop: false, img: {}})}>Anuluj</button>
                        <button className='btn btn-danger' onClick={() => deleteFile(deletePhotoPopup.img)}>Usuń</button>
                    </div>
                </Popup>
            </div>

            <div className="add_photo_popup">
                <Popup trigger={addPhotoPopup} setTrigger={setAddPhotoPopup}>
                    <h3 className='text-center mb-2'>Dodaj zdjęcie</h3>
                    <form onSubmit={addFiles} encType='multipart/form-data'>
                            <div className="uploadDiv2">
                                    <div className="input25">   <input type="file" className="form-control" id="customFile" name='file' multiple/></div>
                            </div>
                            <div className="form-but">
                                    <button className="button">Zapisz</button>
                            </div>
                    </form>
                </Popup>
            </div>
            <div className='d-flex align-items-center justify-content-end'>
                <button
                    onClick={() => setAddPhotoPopup(true)}
                    className="btn btn-info"
                >
                    Dodaj zdjęcie
                </button>
            </div>
        </div>
    );

}
export default ViewGallery
