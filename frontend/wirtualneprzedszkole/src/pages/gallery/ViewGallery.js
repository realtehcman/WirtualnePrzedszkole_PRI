import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import GalleryService from "../gallery/GalleryService";
import "../User/Table.scss";

const ViewGallery = () => {
    const [photos, setPhotos] = useState({
        id: "",

    });

    let { id } = useParams();

    useEffect(() => {
        getData().then(r => console.log(r));
    }, []);

    const getData = async () => {
        GalleryService.ViewFolder(id).then((response) => {
            let galleryData = response.data;

            setPhotos({
                id: galleryData.id,
            });
        });
    };

    return (


        <div >
            {photos}
        </div>
    );

}
export default ViewGallery
