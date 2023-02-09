import React, { useEffect, useState }from 'react'
import ChildrenService from "./ChildrenService";
import {useParams} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditChild = () => {
    const [child, setChild] = useState({
        name:'',
        lastName: '',
        classId: []
    });
    const [childEdit, setChildEdit] = useState({
        name:'',
        lastName: '',
        classId: []
    });
    let {id} = useParams()
    useEffect(() => {
        const getData = async () => {
        ChildrenService.getChild(id).then(response => {
            console.log('Response from main API: ',response)
            let childData = response.data;
            setChild({id: childData.id, name: childData.name, lastName: childData.lastName, classId: childData.classId
            })
            setChildEdit({id: childData.id, name: childData.name, lastName: childData.lastName, classId: childData.classId
            })
        });
    }
        getData()
     // eslint-disable-next-line
    }, [])

    const updateData = async (e) => {
        e.preventDefault()
        childEdit.id = child.id
        if (childEdit.name === "") childEdit.name = child.name
        if (childEdit.lastName === "") childEdit.lastName = child.lastName
        if (childEdit.classId === "") childEdit.classId = child.classId

        ChildrenService.editChild(childEdit)
            .then(response => {
                if(response.status === 200){
                    toast.success("Dane zostały poprawnie zedytowane", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setChildEdit({
                        name:'',
                        lastName: '',
                        classId: ''
                    });

                    // Timer wywal jak Ci się uda zrobic żeby się zedytowane dane wyswietlaly

                    setTimeout(() => {
                        window.location.reload();
                    }, 1800);
                }
            })
            .catch(error => {
                toast.error("Wystąpił błąd podczas edycji", {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }




    return (
        <div className="form">
            <ToastContainer position="top-center" />
            <form>
                <label>Imię:</label><br></br>
                <input placeholder={child.name} onChange={(e) => setChildEdit({...childEdit, name : e.target.value})}/><br></br>
                <label>Nazwisko:</label><br></br>
                <input placeholder={child.lastName}  onChange={(e) => setChildEdit({...childEdit, lastName : e.target.value})}/><br></br>
                <label>id klasy:</label><br></br>
                <input placeholder={child.classId} onChange={(e) => setChildEdit({...childEdit, classId : e.target.value})}/><br></br>
                <button onClick={updateData} className='btn btn-danger'>Zapisz</button>
            </form>
        </div>
    );
}

export default EditChild;