import React, {useEffect, useState} from 'react'
import GroupService from './GroupService'
import {useNavigate, useParams} from "react-router-dom";
import "./Group.scss"
import FolderService from '../Folders/FolderService';
import UserService from '../User/UserService';
import ChildrenService from '../Children/ChildrenService';
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

const Group = () => {

        const { t } = useTranslation();

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
        if(window.confirm(t("confirm_deletion")+ " " + teacher.name + " " + teacher.lastName + t("from_a_group") + " " + group.name )){
            UserService.deleteTeacherFromClass(teacher.id, id).then((response) => {
                if (response.status !== 200) {
                    toast.error(t("error_user_addition"))
                    throw new Error(response.status);
                }
                else {
                    setGroup({id: group.id, name: group.name, description: group.description, children: group.children,
                        teachers: group.teachers.filter((refreshTeachers) => teacher.id !== refreshTeachers.id)})
                    toast.success(t("general_user") + " " + teacher.name + " "+ teacher.lastName + " " + t("success_user_deletion_from_group"))
                }
            })
        }
    }

    const deleteChildFromGroup = async(child) => {
        if (window.confirm(t("confirm_deletion")+ " " + child.name + " " + child.lastName + "z grupy " + group.name)) {
            ChildrenService.deleteChildFromClass(child.id).then((response) => {
                if (response.status !== 200) {
                    toast.error(t("error_user_deletion"))
                    throw new Error(response.status);
                }
                else {
                    setGroup({
                        id: group.id, name: group.name, description: group.description,
                        children: group.children.filter((refreshChildren) => child.id !== refreshChildren.id),
                        teachers: group.teachers
                    })
                    toast.success(t("general_user") + " "  + child.name + " "+ child.lastName + " " + t("success_user_deletion_from_group"))
                }
            })
        }
    }
    const currentUser = useContext(UserContext);

    return (
        <div data-testid="group">
            <ToastContainer />
            <table className="content-table">

                <thead>
                <tr className='table-head'>
                    <td>{group.name}</td>
                            <td>{t('name')}</td>
                            <td>{t('last_name')}</td>
                            <td>{t('remove_from_group')}</td>
                </tr>
                </thead>
                <tbody className='body'>
                {group.teachers.map(teacher => (
                    <tr className="teacher" key={teacher.id}>
                        <td id="td--group">{t('teacher')}</td>
                        <td id="td--group">{teacher.name}</td>
                        <td id="td--group">{teacher.lastName}</td>
                        <td id="td--group">
                            <button onClick={() => deleteTeacherFromGroup(teacher)}  className="btn btn-danger">{t('delete')}</button>
                        </td>
                    </tr>
                ))
                }
                {group.children.map(child => (
                    <tr key={child.id}>
                        <td id="td--group">{t('kid')}</td>
                        <td id="td--group">{child.name}</td>
                        <td id="td--group">{child.lastName}</td>
                        <td id="td--group">
                            <button onClick={() => deleteChildFromGroup(child)}  className="btn btn-danger">{t('delete')}</button>
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </table>
            <div className="div-buttons">
                <div className="class-folders buttons">
                    <button type="button" className="btn btn-success" onClick={() =>  NaviToFolder("Galeria")}>{t('galleries')}</button>
                    <button type="button" className="btn btn-warning" onClick={() => NaviToFolder("Inne")}>{t('other_files')}</button>
                </div>
                <div className="add-teacher">
                    {currentUser.role === "ADMIN" &&  <button type="button" className="btn btn-primary" onClick={() => navigate("/Assign-teacher/" + id)}>{t('assign_a_tutor')}</button>}
                </div>
            </div>
        </div>
    )
}

export default Group
