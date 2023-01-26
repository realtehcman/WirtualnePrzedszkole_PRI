import ChildrenService from "./ChildrenService";
import {useParams, useNavigate} from "react-router-dom";
import React, { useEffect, useState }from 'react'


const EditChild = () => {
    const [child, setChild] = useState({
        id:'',
        name:'',
        lastName: '',
        classId: ''
    });

    const [childEdit, setChildEdit] = useState({
        id:'',
        name:'',
        lastName: '',
        classId: ''
    });

    let {id} = useParams()

    useEffect(() => {
        getData()
    },[])


    const getData = async () => {
        ChildrenService.getChild(id).then(response => {
            console.log('Response from main API: ',response)
            let childData = response.data;
            setChild({id: childData.id, name: childData.name, lastName: childData.lastName, classId: childData.classId
            })
        });
    }

    const updateData = (e) => {
        e.preventDefault()
        childEdit.id = child.id
        if (childEdit.name === "") childEdit.name = child.name
        if (childEdit.lastName === "") childEdit.lastName = child.lastName
        if (childEdit.classId === "") childEdit.classId = child.classId

        console.log(childEdit)
        ChildrenService.editChild(childEdit)
    }


    return (
        <div>
            <form>
                <label>Imię:</label><br></br>
                <input placeholder={child.name} onChange={(e) => setChildEdit({...childEdit, name : e.target.value})}/><br></br>
                <label>Nazwisko:</label><br></br>
                <input  placeholder={child.lastName} onChange={(e) => setChildEdit({...childEdit, lastName : e.target.value})}/><br></br>
                <label>id klasy:</label><br></br>
                <input  placeholder={child.classId} onChange={(e) => setChildEdit({...childEdit, classId : e.target.value})}/><br></br>
                <button onClick={updateData} className='btn btn-danger'>Zapisz</button>

            </form>
        </div>
    )
}

export default EditChild