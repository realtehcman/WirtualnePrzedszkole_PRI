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

    const [userEdit, setUserEdit] = useState({
        id:'',
        email: '',
        name:'',
        lastName: '',
        phoneNumber: '',
        address: ''
    });

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