import UserService from "../User/UserService";
import {useParams} from "react-router-dom";
import React, { useEffect, useState }from 'react'
import { useTranslation } from "react-i18next";


const EditUser = () => {
        const {t} = useTranslation();

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
    // eslint-disable-next-line
    }, [])

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
            <form>
                <div className="row">
                    <div className="col-md-6 col-12 mb-3">
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <label>{t('name')}:</label>
                            </div>
                            <div className="col-md-9 col-12">
                                <input placeholder={user.name} className="form-control" onChange={(e) => setUserEdit({ ...userEdit, name: e.target.value })} />
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6 col-12 mb-3">
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <label>{t('last_name')}:</label>
                            </div>
                            <div className="col-md-9 col-12">
                                <input placeholder={user.lastName} className="form-control" onChange={(e) => setUserEdit({ ...userEdit, lastName: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-12 mb-3">
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <label>{t('email')}:</label>
                            </div>
                            <div className="col-md-9 col-12">
                                <input placeholder={user.email} className="form-control" onChange={(e) => setUserEdit({ ...userEdit, email: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 mb-3">
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <label>{t('address')}:</label>
                            </div>
                            <div className="col-md-9 col-12">
                                <input placeholder={user.address} className="form-control" onChange={(e) => setUserEdit({ ...userEdit, address: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <label>{t('telephone')}:</label>
                            </div>
                            <div className="col-md-9 col-12">
                                <input placeholder={user.phoneNumber} className="form-control" onChange={(e) => setUserEdit({ ...userEdit, phoneNumber: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <label>{t('description')}:</label>
                            </div>
                            <div className="col-md-9 col-12">
                                <input placeholder={user.opis} className="form-control" onChange={(e) => setUserEdit({ ...userEdit, opis: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center mt-5">
                    <button onClick={updateData} className='btn btn_global'>{t('save')}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditUser
