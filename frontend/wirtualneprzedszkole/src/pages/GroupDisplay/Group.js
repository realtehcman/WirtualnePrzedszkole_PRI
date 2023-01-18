import React, { useEffect, useState }from 'react'
import GroupService from './GroupService'
import {useParams, useNavigate} from "react-router-dom";
import "./Group.scss"
import FolderService from '../Folders/FolderService';

const Group = () => {
    const navigate = useNavigate()
    const [group, setGroup] = useState({
        id:'',
        name: '',
        description:'',
        children: [{
            id: '',
            name: '',
            lastName: ''
        }],
        teachers: [{
            id: '',
            name: '',
            lastName: ''
        }]
    });

    const [subFolders, setSubFolders] = useState([
        {
            id: "",
            name: "",
            path: "",
            className: "",
            fileDataList: [{}],
            childrenFolder: [{}],
            parent: {},
        }
    ])
    let {id} = useParams()

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        
        let className = await GroupService.getGroup(id).then(response => {
            //console.log('Response from main API: ',response)
            let groupData = response.data;
            let children = groupData.children.map(it => {return {id: it.id, name: it.name, lastName: it.lastName}})
            let teachers = groupData.teachers.map(it => {return {id: it.id, name: it.name, lastName: it.lastName}})
            setGroup({id: groupData.id, name: groupData.name, description: groupData.description, children:  children, teachers: teachers})
            return groupData.name
        });

        getFolders(className)
        
    }

    const getFolders = async (className) => {
        FolderService.getClassSubFolders(className).then(response => {
            setSubFolders(response.data)
            console.log(subFolders)
        })
    }

    const NaviToFolder = (type) => {
        subFolders.forEach((folder) => {
            if (type === "Galeria" && folder.name === "Photos")
                navigate("/Folder/" + folder.name + "/" + folder.id)
            else if (type === "Inne" && folder.name === "Other")
                navigate("/Folder/" + folder.name + "/" + folder.id)
        })
    }

    return (
        <div>
            <table className="content-table">
                <thead>
                    <tr className='table-head'>
                        <td>{group.name}</td>
                        <td>Imię</td>
                        <td>Nazwisko</td>
                    </tr>
                </thead>
                <tbody className='body'>
                    {group.teachers.map(teacher => (
                    <tr className="teacher" key={teacher.id}>
                        <td>Nauczyciel</td>
                        <td>{teacher.name}</td>
                        <td>{teacher.lastName}</td>
                    </tr>
                    ))
                    }
                    {group.children.map(child => (
                    <tr key={child.id}>
                        <td>Dziecko</td>
                        <td>{child.name}</td>
                        <td>{child.lastName}</td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
            <div className="classFolders">
                <button type="button" class="btn btn-success" onClick={() =>  NaviToFolder("Galeria")}>Galerie</button>
                <button type="button" class="btn btn-warning" onClick={() => NaviToFolder("Inne")}>Inne Pliki</button>
            </div>
    </div>
    )
}

export default Group