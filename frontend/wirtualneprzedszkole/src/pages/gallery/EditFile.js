import FileService from "./FileService";
import React, {useState} from 'react'
import "../gallery/KnowledgeEdit.scss"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const EditFile = (props) => {
    const { t } = useTranslation();

    const file = {
        popUp: props.isPop,
        id: props.fileId,
        description: props.description
    }

    const [fileDescription, setFileDescription] = useState({
        description: ""
    });

    const updateData = async (e) => {
        e.preventDefault();
        FileService.patchFile(file.id, fileDescription).then((response) => {
            if (response.status === 200) {
                toast.success(t("success_file_edition"));
                window.location.reload(true);
            }
        }).catch((error) => {
            toast.error(t("error_file_edition"));
        });
    }



    return (
        <div className="edit">
            <ToastContainer />

            <form>
            <label>{t('description')}</label><br></br>
            <textarea className="text" placeholder={props.description} onChange={(e) => setFileDescription({description : e.target.value})}>{file.description}</textarea><br></br>
            <button onClick={updateData} className='btn btn-danger'>{t('save')}</button>
            </form>
        </div>
    )
}

export default EditFile
