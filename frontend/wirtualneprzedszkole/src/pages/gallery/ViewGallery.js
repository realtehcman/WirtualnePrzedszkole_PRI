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

    const [deletePhotoPopup, setDeletePhotoPopup] = useState(false);
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

        /* GalleryService.AddFile(folder.id, formData).then((res) => {
            if (res.status !== 200){
                console.log(res + "Successfully uploaded");
            }
        }) */
        setAddPhotoPopup(false);
    }

    return (
        <div>
            {/* {photos} */}
            <div className='d-flex align-items-center justify-content-end'>
                <button
                    onClick={() => setAddPhotoPopup(true)}
                    className="btn btn-info"
                >
                    dodać obraz
                </button>
            </div>

            <div className='gallery_container px-4 py-4'>
                <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {photos.map((photo) => (
                        <div className='gallery_img position-relative' key={photo[1].id}>
                            <button type="button" className='btn btn-info del_gallery_img mx-1 my-1 px-0 py-0' onClick={() => setDeletePhotoPopup(true)}>
                                <ClearIcon className="icon mx-0" />
                            </button>
                        
                            <img src={photo[0]} width="100px" alt={photo[1].name}/>
                        </div>
                    )
                    )}
                </Masonry>
            </div>

            <div className="delete_photo_popup">
                <Popup trigger={deletePhotoPopup} setTrigger={setDeletePhotoPopup}>
                    <h3 className='text-center mb-2'>Usuń Obrazy</h3>
                    <p className='text-center py-3'>Czy na pewno chcesz usunąć ten obraz?</p>
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-primary' onClick={() => setDeletePhotoPopup(false)}>Anulować</button>
                        <button className='btn btn-danger' onClick={() => setDeletePhotoPopup(false)}>Usuwać</button>
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
        </div>
    );

}
export default ViewGallery
