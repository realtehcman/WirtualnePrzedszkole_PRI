import UserService from "../User/UserService";
import {useParams} from "react-router-dom";
import React, { useEffect, useState }from 'react'


const EditUser = () => {
    const [user, setUser] = useState({
        id:'',
        email: '',
        name:'',
        lastName: '',
        phoneNumber: '',
        address: '',
        opis: ''
    });

    const [userEdit, setUserEdit] = useState({
        id:'',
        email: '',
        name:'',
        lastName: '',
        phoneNumber: '',
        address: '',
        opis: ''
    });

    let {id} = useParams()
    
    useEffect(() => {
        const getData = async () => {
        // const response = UserService.getUser(id)
        // setUser((await response).data)
        UserService.getUser(id).then(response => {
            console.log('Response from main API: ',response)
            let userData = response.data;
            setUser({id: userData.id, email: userData.email, name: userData.name, lastName: userData.lastName, phoneNumber: userData.phoneNumber,
                 address:userData.address,opis: userData.opis
            })
        });
    }
        getData()
    })

    const updateData = (e) => {
        e.preventDefault()
        userEdit.id = user.id
        if (userEdit.name === "") userEdit.name = user.name
        if (userEdit.lastName === "") userEdit.lastName = user.lastName
        if (userEdit.email === "") userEdit.email = user.email
        if (userEdit.phoneNumber === "") userEdit.phoneNumber = user.phoneNumber
        if (userEdit.address === "") userEdit.address = user.address
        if (userEdit.opis === "") userEdit.opis = user.opis
        console.log(userEdit)
        UserService.editUser(userEdit)
    }


    return (
        <div data-testid="edit-user">
            <form className="form">
            <label>Imię:</label><br></br>
            <input placeholder={user.name} onChange={(e) => setUserEdit({...userEdit, name : e.target.value})}/><br></br>
            <label>Nazwisko:</label><br></br>
            <input  placeholder={user.lastName} onChange={(e) => setUserEdit({...userEdit, lastName : e.target.value})}/><br></br>
            <label>Email:</label><br></br>
            <input  placeholder={user.email} onChange={(e) => setUserEdit({...userEdit,email : e.target.value})}/><br></br>
            <label>Adres:</label><br></br>
            <input placeholder={user.address} onChange={(e) => setUserEdit({...userEdit, address : e.target.value})}/><br></br>
            <label>Telefon:</label><br></br>
            <input placeholder={user.phoneNumber} onChange={(e) => setUserEdit({...userEdit,phoneNumber : e.target.value})}/><br></br>
            <label>Opis :</label><br></br>
            <input placeholder={user.opis} onChange={(e) => setUserEdit({...userEdit,opis : e.target.value})}/><br></br>
            <button onClick={updateData} className='btn btn-danger'>Zapisz</button>

            </form>
        </div>
    )
}

export default EditUser
