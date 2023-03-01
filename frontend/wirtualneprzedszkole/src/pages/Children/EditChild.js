import React, { useEffect, useState }from 'react'
import ChildrenService from "./ChildrenService";
import {useParams} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GroupService from "../GroupDisplay/GroupService"
import { useTranslation } from "react-i18next";

const EditChild = () => {
    const { t } = useTranslation();
    const [child, setChild] = useState({
        id: "",
        name:'',
        lastName: '',
        className: '',
        classId: ''
    });
    const [childEdit, setChildEdit] = useState({
        id: '',
        name: '',
        lastName: '',
        className: '',
        classId: ''
    });

    const [allGroups, setAllGroups] = useState([])

    let {id} = useParams()
    useEffect(() => {
        const getData = async () => {
        ChildrenService.getChild(id).then(response => {
            console.log('Response from main API: ',response)
            let childData = response.data;
            if (childData.classId !== undefined) {
                GroupService.getGroup(childData.classId).then(response => {
                    setChild({id: childData.id, name: childData.name, lastName: childData.lastName, className: (response.data).name, classId: childData.classId})
                })
            } else {
                setChild({id: childData.id, name: childData.name, lastName: childData.lastName, classId: childData.classId})
            }
        });

        GroupService.getGroups().then(response => {
            setAllGroups(response.data)
        })
    }
    
        getData()
     // eslint-disable-next-line
    }, [])

    const updateData = async (e) => {
        e.preventDefault()
        childEdit.id = child.id
        if (childEdit.name === "") childEdit.name = child.name
        if (childEdit.lastName === "") childEdit.lastName = child.lastName
        if (childEdit.className === "") childEdit.className = child.className
        if (childEdit.classId === "") childEdit.classId = child.classId

        ChildrenService.editChild(childEdit)
            .then(response => {
                if(response.status === 200){
                    toast.success(t("success_data_edition"), {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setChild(childEdit)
                    setChildEdit({
                        name:'',
                        lastName: '',
                        className: '',
                        classId: ''
                    });

                    // Timer wywal jak Ci się uda zrobic żeby się zedytowane dane wyswietlaly
                    setTimeout(() => {
                        window.location.reload();
                    }, 1800);

                }
            })
            .catch(error => {
                toast.error(t("error_while_editin"), {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }




    return (
        <div className="form">
            <ToastContainer position="top-center" />
            <form>
                <label>{t('name')}:</label><br></br>
                <input placeholder={child.name} onChange={(e) => setChildEdit({...childEdit, name : e.target.value})}/><br></br>
                <label>{t('last_name')}:</label><br></br>
                <input placeholder={child.lastName}  onChange={(e) => setChildEdit({...childEdit, lastName : e.target.value})}/><br></br>
                {/* <label>id klasy:</label><br></br>
                <input placeholder={child.classId} onChange={(e) => setChildEdit({...childEdit, classId : e.target.value})}/><br></br> */}
                
                {/* <input placeholder={child.classId} onChange={(e) => setChildEdit({...childEdit, classId : e.target.value})}/><br></br> */}
                <label>{t('assign_a_class')}:</label><br></br>
                <select className='d-block'  onChange={(e) => setChildEdit({...childEdit, classId : e.target.value})}>
                    <option>{child.className}</option>
                    {allGroups.filter(groupFilter => groupFilter.name !== child.className).map((group) => (
                      <option key={group.id} value={group.id}> {group.name}</option>
                    ))}
                </select>
                <br></br>
                <button onClick={updateData} className='btn btn-danger'>{t('save')}</button>
            </form>
        </div>
    );
}

export default EditChild;