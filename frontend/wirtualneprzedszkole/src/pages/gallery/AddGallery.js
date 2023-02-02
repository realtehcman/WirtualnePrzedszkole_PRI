import React from "react";
import '../CreateUser/CreateUser.scss'
import CreateGallery from "./CreateGallery";

const AddGallery = () => {
    return (
        <div data-testid="add-gallery" className="addusers">
            <div className="addusersContainer">
                <CreateGallery/>
            </div>
        </div>
    )
}

export default AddGallery
