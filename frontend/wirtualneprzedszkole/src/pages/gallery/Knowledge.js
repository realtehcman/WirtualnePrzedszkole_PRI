import FileService from "../gallery/FileService";
import "../gallery/Knowledge.scss";
import {useParams, useNavigate} from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react'
import saveAs from 'file-saver'
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';


const Knowledge = () => {
    //const [files, setFiles] = useState([])
    const [filesHash, setFilesHash] = useState([]);
    const [filesInfo, setFilesInfo] = useState([
        {
            id: "",
            name: "",
            hash: ""
        }
    ])
    const [fileName, setFileName] = useState([])
    const KNOWLEDGE_ID = 0
    
    useEffect(() => {
        getKnowledge()
    },[])

    

    const getKnowledge = async () => {
        FileService.getKnowledge().then((response) => {
            let responseFiles = response.data
            responseFiles.sort(function(a, b) {
                return a.id - b.id;
            });
            setFilesInfo(responseFiles)     
        }).then({}).catch((reason) => {
            console.log(`axios request failed: ${reason}`);
        })

        console.log(filesInfo)
    }


    const printFiles = (e, file) => {
        FileService.getFile(KNOWLEDGE_ID, file.hash).then((response) => {
            saveAs(response.data, file.name)
      })
    }
      
    /* const renderPageLink = () => {
        let td = [];
        console.log(filesInfo.length)
        for (let i = 0; i < filesInfo.length; i++) {
            td.push(<td key={i}>{filesInfo[i].name}</td><td key={i}><button className="btndown" onClick={e => printFiles(e, i)}><DownloadForOfflineIcon></DownloadForOfflineIcon></button></td>)
            //<button onClick={saveFile}>download</button>   
        }

        return td;
    } */

    

    const handleSubmit = async(event) => {
        event.preventDefault()
    
        const formData = new FormData(event.currentTarget);
    
        const files = event.currentTarget;
        for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
        }
        FileService.addFiles(KNOWLEDGE_ID, formData)
    }
 
    return (
        <div className="scrollable-div">
            <table className="content-table">
                <thead>
                    <tr className="table-head">
                        <td>Plik</td>
                        <td>Pobierz</td>
                    </tr>
                </thead>
                <tbody className="body table-body">
                    {filesInfo.map((file) => (
                        <tr key = {file.id}>
                            <td>{file.name}</td>
                            <td key={file.id}><button className="btndown" onClick={e => printFiles(e, file)}><DownloadForOfflineIcon></DownloadForOfflineIcon></button></td>
                        {/* {renderPageLink()} */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <div className="uploadDiv">
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                 <div className="input23">   <input type="file" className="form-control" id="customFile" name='file' multiple/></div>
                    <p></p>
                    <button type="submit" className="btn btn-primary"> Wyślij</button>
                </form>

            </div>

        </div>
    );
}

export default Knowledge