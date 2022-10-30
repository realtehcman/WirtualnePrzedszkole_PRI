import UserService from "../User/UserService";
import {useParams, useNavigate} from "react-router-dom";
import React, { useEffect, useState }from 'react'
import User from "../User/User";


const EditUser = () => {
    const [user, setUser] = useState({
        id:'',
        email: '',
        name:'',
        lastName: '',
        phoneNumber: '',
        address: ''
    });

    let {id} = useParams()
    
    useEffect(() => {
        getData()
    },[])


    const getData = async () => {
        // const response = UserService.getUser(id)
        // setUser((await response).data)
        UserService.getUser(id).then(response => {
            console.log('Response from main API: ',response)
            let userData = response.data;
            setUser({id: userData.id, email: userData.email, name: userData.name, lastName: userData.lastName, phoneNumber: userData.phoneNumber,
                 address:userData.address
            })
        });
    }

    function putData()  {
        console.log(user)
        UserService.editUser(user)
    }


    return (
        <div>
            <form>
            <label>Imię:</label><br></br>
            <input placeholder={user.name} onChange={() => setUser({name: user.name})}/><br></br>
            <label>Nazwisko:</label><br></br>
            <input  placeholder={user.lastName} onChange={() => setUser({lastName: user.lastName})}/><br></br>
            <label>Email:</label><br></br>
            <input  placeholder={user.email} onChange={() => setUser({email: user.email})}/><br></br>
            <label>Adres:</label><br></br>
            <input placeholder={user.address} onChange={() => setUser({address: user.address})}/><br></br>
            <label>Telefon:</label><br></br>
            <input placeholder={user.phoneNumber} onChange={() => setUser({phoneNumber: user.phoneNumber})}/><br></br>
            <button onClick={putData} className='btn btn-danger'>Zapisz</button>

            </form>
        </div>
    )
}

export default EditUser