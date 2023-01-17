import FileService from "./FileService";
import {useParams, useNavigate} from "react-router-dom";
import React, { useEffect, useState }from 'react'
import "../gallery/KnowledgeEdit.scss"
import Knowledge from "./Knowledge"


const EditFile = (props) => {
    
    const file = {
        popUp: props.isPop,
        id: props.fileId,
        description: props.description
    }

    console.log(props)

    const [fileDescription, setFileDescription] = useState({
        description: ""
    });

    const updateData = (e) => {
        e.preventDefault()
        FileService.patchFile(file.id, fileDescription).then((response) => {
            if (response.status !== 200) throw new Error(response.status)
            else {
                window.location.reload(true);
            }
        })
    }


    return (
        <div className="edit">
            <form>
            <label>Opis:</label><br></br>
            <textarea className="text" placeholder={props.description} onChange={(e) => setFileDescription({description : e.target.value})}>{file.description}</textarea><br></br>
            <button onClick={updateData} className='btn btn-danger'>Zapisz</button>
            </form>
        </div>
    )
}

export default EditFile