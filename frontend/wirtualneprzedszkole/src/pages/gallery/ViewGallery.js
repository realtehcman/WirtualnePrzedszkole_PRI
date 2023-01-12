import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import GalleryService from "../gallery/GalleryService";
import "../User/Table.scss";

const ViewGallery = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState({
        id: "",

    });

    let { id } = useParams();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        GalleryService.ViewFolder(id).then((response) => {
            console.log("Response from main API: ", response);
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