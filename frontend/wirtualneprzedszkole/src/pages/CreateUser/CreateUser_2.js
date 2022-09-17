import React, { useState } from 'react'
import UserService from '../User/UserService'
import "./CreateUser.scss"

const CreateUser = () => {
    //const navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    //const [picture, setPicture] = useState(null);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');

    const saveUser =  (e) => {
        e.preventDefault();
        
        UserService.addUser(JSON.stringify({email, name, lastName, address, phoneNumber, role})).then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className='formContainer'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <div className='form-body'>
                        <form onSubmit={saveUser}>
                            <div className='form-group'>
                                <input placeholder='Imię' name="Imię" className='"form-control' 
                                onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <input placeholder='Nazwisko' name="Nazwisko" className='"form-control' 
                                onChange={e => setLastName(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <input placeholder='Email' name="Email" className='"form-control' 
                                onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <input placeholder='Adres' name="Adres" className='"form-control' 
                                onChange={e => setAddress(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <input placeholder='Numer Telefonu' name="Numer Telefonu" className='"form-control' 
                                onChange={e => setPhoneNumber(e.target.value)}/>
                            </div><div className='form-group'>
                                <input placeholder='Rola' name="Rola" className='"form-control' 
                                onChange={e => setRole(e.target.value)}/>
                            </div>
                            <div className="form-but">
                                    <button className="button">Zapisz</button>
                                </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default CreateUser