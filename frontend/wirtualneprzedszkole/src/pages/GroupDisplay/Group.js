import React, {useEffect, useState} from 'react'
import GroupService from './GroupService'
import {useNavigate, useParams} from "react-router-dom";
import "./Group.scss"
import FolderService from '../Folders/FolderService';
import UserService from '../User/UserService';
import ChildrenService from '../Children/ChildrenService';
import { ToastContainer, toast } from "react-toastify";

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
        const getData = async () => {
        
        let className = await GroupService.getGroup(id).then(response => {
            let groupData = response.data;
            let children = groupData.children.map(it => {return {id: it.id, name: it.name, lastName: it.lastName}})
            let teachers = groupData.teachers.map(it => {return {id: it.id, name: it.name, lastName: it.lastName}})
            setGroup({id: groupData.id, name: groupData.name, description: groupData.description, children:  children, teachers: teachers})
            return groupData.name
        });

        getFolders(className)
        
    }
        getData().then(r => console.log(r))
     // eslint-disable-next-line
    }, [])

    

    const getFolders = async (className) => {
        FolderService.getClassSubFolders(className).then(response => {
            setSubFolders(response.data)
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

    const deleteTeacherFromGroup = async(teacher) => {
        if(window.confirm("Czy na pewno chcesz usunąć " + teacher.name + " " + teacher.lastName + "z grupy " + group.name )){
            UserService.deleteTeacherFromClass(teacher.id, id).then((response) => {
                if (response.status !== 200) {
                    toast.error("Wystąpił błąd podczas usuwania użytkownika")
                    throw new Error(response.status);
                }
                else {
                    setGroup({id: group.id, name: group.name, description: group.description, children: group.children,
                        teachers: group.teachers.filter((refreshTeachers) => teacher.id !== refreshTeachers.id)})
                    toast.success("Użytkownik " + teacher.name + " "+ teacher.lastName + " został pomyślnie usuniety z grupy")
                }
            })
        }
    }

    const deleteChildFromGroup = async(child) => {
        if (window.confirm("Czy na pewno chcesz usunąć " + child.name + " " + child.lastName + "z grupy " + group.name)) {
            ChildrenService.deleteChildFromClass(child.id).then((response) => {
                if (response.status !== 200) {
                    toast.error("Wystąpił błąd podczas usuwania użytkownika")
                    throw new Error(response.status);
                }
                else {
                    setGroup({
                        id: group.id, name: group.name, description: group.description,
                        children: group.children.filter((refreshChildren) => child.id !== refreshChildren.id),
                        teachers: group.teachers
                    })
                    toast.success("Użytkownik " + child.name + " "+ child.lastName + " został pomyślnie usuniety z grupy")
                }
            })
        }
    }

    return (
        <div data-testid="group">
        <ToastContainer />
            <table className="content-table w-100">

                <thead>
                    <tr className='table-head'>
                        <td>{group.name}</td>
                        <td>Imię</td>
                        <td>Nazwisko</td>
                        <td>Usuń z grupy</td>
                    </tr>
                </thead>
                <tbody className='body'>
                    {group.teachers.map(teacher => (
                    <tr className="teacher" key={teacher.id}>
                        <td>Nauczyciel</td>
                        <td>{teacher.name}</td>
                        <td>{teacher.lastName}</td>
                        <td>
                            <button onClick={() => deleteTeacherFromGroup(teacher)}  className="btn btn-danger">Usuń</button>
                        </td>
                    </tr>
                    ))
                    }
                    {group.children.map(child => (
                    <tr key={child.id}>
                        <td>Dziecko</td>
                        <td>{child.name}</td>
                        <td>{child.lastName}</td>
                        <td>
                            <button onClick={() => deleteChildFromGroup(child)}  className="btn btn-danger">Usuń</button>
                        </td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
            <div className="row mt-4">
                <div className="col-md-6 col-12">
                    <button type="button" class="btn btn-success" onClick={() => NaviToFolder("Galeria")}>Galerie</button>
                    <button type="button" class="btn btn-warning" onClick={() => NaviToFolder("Inne")}>Inne Pliki</button>
                </div>
                <div className="col-md-6 col-12 text-end">
                    <button type="button" class="btn btn-primary" onClick={() => navigate("/Assign-teacher/" + id)}>Przypisz Nauczyciela</button>
                </div>
            </div>
    </div>
    )
}

export default Group
