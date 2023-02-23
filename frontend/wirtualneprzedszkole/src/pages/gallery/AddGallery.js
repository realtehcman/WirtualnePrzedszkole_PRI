import React from "react";
import '../CreateUser/CreateUser.scss'
import CreateGallery from "./CreateGallery";
import { useTranslation } from "react-i18next";

const AddGallery = () => {
    const {t} = useTranslation();
    return (
        <div data-testid="add-gallery" className="addusers">
            <div className="addusersContainer m-0">
                <CreateGallery t={t}/>
            </div>
        </div>
    )
}

export default AddGallery
