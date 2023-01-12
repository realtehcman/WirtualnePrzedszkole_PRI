import FileService from "../gallery/FileService";
import {useParams, useNavigate} from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react'
import saveAs from 'file-saver'


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
        
        /* let images = []
        for (let i = 0; i < files.length; i++) {
            let img
            FileService.getFile(KNOWLEDGE_ID, files[i]).then((res) => {
                //setKnowFile(res.data)
                img = res.data
                //console.log(img)
            })
            //console.log(typeof(img))
            images[i] = img.data
            console.log(img)
        } 
        setKnowFile(images)
        console.log(knowFile) */
        //console.log(knowFile[0])
    }


    const printTickets = (e, i) => {
        FileService.getFile(KNOWLEDGE_ID, filesHash[i]).then((response) => {
            saveAs(response.data, fileName[i])
      })
    }
      
    const renderPageLink = () => {
        let td = [];
        console.log(filesHash.length)
        for (let i = 0; i < filesHash.length; i++) {
            td.push(<td key={i}><button onClick={e => printTickets(e, i)}>{fileName[i]}</button></td>)
            //<button onClick={saveFile}>download</button>   
        }

        return td;
    }
 
    return (
        <div>
            <table>
                <tbody>
                    <tr>{renderPageLink()}</tr>
                </tbody>
                </table>
        </div>
    );
}

export default Knowledge