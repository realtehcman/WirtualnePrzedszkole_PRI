import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import GalleryService from "../gallery/GalleryService";
import "../User/Table.scss";
import Masonry from 'react-masonry-css'
import ClearIcon from '@mui/icons-material/Clear';
import '../../../src/Styles.scss';
import Popup from '../GroupDisplay/Popup';
import CreateGallery from './CreateGallery';


const photoGallery = [
    {
        src: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 4,
        height: 3
    },
    {
        src: 'https://images.pexels.com/photos/7505201/pexels-photo-7505201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 1,
        height: 1
    },
    {
        src: 'https://images.pexels.com/photos/12880492/pexels-photo-12880492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 4,
        height: 3
    },
    {
        src: 'https://images.pexels.com/photos/15293662/pexels-photo-15293662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 4,
        height: 3
    },
    {
        src: 'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 4,
        height: 3
    },
    {
        src: 'https://images.pexels.com/photos/15386484/pexels-photo-15386484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 4,
        height: 3
    },
    {
        src: 'https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=600',
        width: 4,
        height: 3
    },
    {
        src: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 1,
        height: 1
    },
    {
        src: 'https://images.pexels.com/photos/12880492/pexels-photo-12880492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 4,
        height: 3
    },
    {
        src: 'https://images.pexels.com/photos/15293662/pexels-photo-15293662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 4,
        height: 3
    },
    {
        src: 'https://images.pexels.com/photos/15452120/pexels-photo-15452120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 4,
        height: 3
    },
    {
        src: 'https://images.pexels.com/photos/15386484/pexels-photo-15386484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        width: 4,
        height: 3
    },
];

const ViewGallery = () => {
    const [photos, setPhotos] = useState({
        id: "",

    });
    const [deletePhotoPopup, setDeletePhotoPopup] = useState(false);
    const [addPhotoPopup, setAddPhotoPopup] = useState(false);
    const [selectPhotos, setSelectedPhotos] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            GalleryService.ViewFolder(id).then((response) => {
                let galleryData = response.data;
                console.log(galleryData);

                setPhotos({
                    id: galleryData.id,
                });
            });
        };
        getData().then(r => console.log(r));
        // eslint-disable-next-line
    }, []);

    let formData = new FormData();

    const onSelected = (e) => {
       setSelectedPhotos(e.target.files);
      
    }

    const addFiles = () => {
        debugger
        formData.append('files', [selectPhotos[0]]);
        console.log(formData);
        GalleryService.AddMultiFiles(id, formData).then((res) => {
            debugger
            console.log(res, "response after post the data in Gallery");
        })
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
                    {photoGallery.map((photo) => (
                        <div className='gallery_img position-relative'>
                            <button type="button" className='btn btn-info del_gallery_img mx-1 my-1 px-0 py-0' onClick={() => setDeletePhotoPopup(true)}>
                                <ClearIcon className="icon mx-0" />
                            </button>
                            <img src={photo.src} width="100%" />
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
                    <div className='my-4'>
                        <input onChange={onSelected} type="file" class="form-control" name="image" accept="image/png, image/gif, image/jpeg" multiple />
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-primary' onClick={() => addFiles()}>Dodać</button>
                    </div>
                </Popup>
            </div>
        </div>
    );

}
export default ViewGallery
