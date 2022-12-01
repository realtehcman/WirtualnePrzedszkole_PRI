import UserService from "../Home/Current_UserService";
import {useParams, useNavigate} from "react-router-dom";
import React, { useEffect, useState }from 'react'
import Current_User from "../Home/Home";
import Current_UserService from "./Current_UserService";


const EditCurrent_User = (props) => {
    const current_user = {
        id: props.id,
        email: props.email,
        name: props.name,
        lastName: props.lastName,
        phoneNumber: props.phoneNumber,
        address: props.address
    };

    //const current_user = props
    
    //dodałem
    const [userEdit, setUserEdit] = useState({
        id:'',
        email: '',
        name:'',
        lastName: '',
        phoneNumber: '',
        address: ''
    });


    // useEffect(() => {
    //     getData()
    // },[])


    // const getData = async () => {

    //     Current_UserService.getCurrent_User(id).then(response => {
    //         console.log('Response from main API: ',response)
    //         let current_userData = response.data;
    //         setCurrent_User({id: current_userData.id, email: current_userData.email, name: current_userData.name, lastName: current_userData.lastName, phoneNumber: current_userData.phoneNumber,
    //             address:current_userData.address
    //         })
    //     });
    // }

    // function putData()  {
    //     console.log(current_user)
    //     Current_UserService.EditCurrent_User(current_user)
    // }


    // return (
    //     <div>
    //         <form>
    //             <label>Imię:</label><br></br>
    //             <input placeholder={current_user.name} onChange={() => setCurrent_User({name: current_user.name})}/><br></br>
    //             <label>Nazwisko:</label><br></br>
    //             <input placeholder={current_user.lastName} onChange={() => setCurrent_User({lastName: current_user.lastName})}/><br></br>
    //             <label>Email:</label><br></br>
    //             <input placeholder={current_user.email} onChange={() => setCurrent_User({email: current_user.email})}/><br></br>
    //             <label>Adres:</label><br></br>
    //             <input placeholder={current_user.address} onChange={() => setCurrent_User({address: current_user.address})}/><br></br>
    //             <label>Telefon:</label><br></br>
    //             <input placeholder={current_user.phoneNumber} onChange={() => setCurrent_User({phoneNumber: current_user.phoneNumber})}/><br></br>
    //             <button onClick={putData} className='btn btn-danger'>Zapisz</button>

    //         </form>
    //     </div>
    // )


    //dodałemn
    const updateData = (e) => {
        e.preventDefault()
        userEdit.id = current_user.id
        if (userEdit.name === "") userEdit.name = current_user.name
        if (userEdit.lastName === "") userEdit.lastName = current_user.lastName
        if (userEdit.email === "") userEdit.email = current_user.email
        if (userEdit.phoneNumber === "") userEdit.phoneNumber = current_user.phoneNumber
        if (userEdit.address === "") userEdit.address = current_user.address
        console.log(userEdit)
        Current_UserService.EditCurrent_User(userEdit)
    }

    //dodałem
    return (
        <div>
            <form>
            <label>Imię:</label><br></br>
            <input placeholder={current_user.name} onChange={(e) => setUserEdit({...userEdit, name : e.target.value})}/><br></br>
            <label>Nazwisko:</label><br></br>
            <input  placeholder={current_user.lastName} onChange={(e) => setUserEdit({...userEdit, lastName : e.target.value})}/><br></br>
            <label>Email:</label><br></br>
            <input  placeholder={current_user.email} onChange={(e) => setUserEdit({...userEdit,email : e.target.value})}/><br></br>
            <label>Adres:</label><br></br>
            <input placeholder={current_user.address} onChange={(e) => setUserEdit({...userEdit, address : e.target.value})}/><br></br>
            <label>Telefon:</label><br></br>
            <input placeholder={current_user.phoneNumber} onChange={(e) => setUserEdit({...userEdit,phoneNumber : e.target.value})}/><br></br>
            <button onClick={updateData} className='btn btn-danger'>Zapisz</button>

            </form>
        </div>
    )
}

export default EditCurrent_User