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
    const [fileName, setFileName] = useState([])
    const KNOWLEDGE_ID = 0
    
    useEffect(() => {
        getKnowledge()
    },[])

    const getKnowledge = async () => {
        let hash = []
        let name = []
        FileService.getKnowledge().then((response) => {
             Object.keys(response.data).map((key) => {
                //console.log(key)
                //console.log(response.data[key])
                //const tmp = {hash: key, name: response.data[key]}
                hash.push(key)
                name.push(response.data[key])
                //setFiles({hash: key, name: response.data[key]})
                //console.log(value)
            })
            
            setFilesHash(hash)
            setFileName(name)
            console.log(filesHash)
            console.log(fileName)

            
        }).then({}).catch((reason) => {
            console.log(`axios request failed: ${reason}`);
        })
    }


    const printFiles = (e, i) => {
        FileService.getFile(KNOWLEDGE_ID, filesHash[i]).then((response) => {
            saveAs(response.data, fileName[i])
      })
    }
      
    const renderPageLink = () => {
        let td = [];
        console.log(filesHash.length)
        for (let i = 0; i < filesHash.length; i++) {
            td.push(<tr><td key={i}>{fileName[i]}</td><td key={i}><button className="btndown" onClick={e => printFiles(e, i)}><DownloadForOfflineIcon></DownloadForOfflineIcon></button></td></tr>)
            //<button onClick={saveFile}>download</button>   
        }

        return td;
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
                    {renderPageLink()}
                </tbody>
            </table>
        </div>
    );
}

export default Knowledge