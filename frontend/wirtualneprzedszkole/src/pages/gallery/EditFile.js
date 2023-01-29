import FileService from "./FileService";
import React, {useState} from 'react'
import "../gallery/KnowledgeEdit.scss"
import Knowledge from "./Knowledge"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditFile = (props) => {
    
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
                toast.success("Plik został pomyślnie edytowany");
                window.location.reload(true);
            }
        }).catch((error) => {
            toast.error("Wystąpił błąd podczas edycji pliku");
        });
    }



    return (
        <div className="edit">
            <ToastContainer />

            <form>
            <label>Opis:</label><br></br>
            <textarea className="text" placeholder={props.description} onChange={(e) => setFileDescription({description : e.target.value})}>{file.description}</textarea><br></br>
            <button onClick={updateData} className='btn btn-danger'>Zapisz</button>
            </form>
        </div>
    )
}

export default EditFile
