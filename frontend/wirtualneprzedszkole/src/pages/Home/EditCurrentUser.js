import React, { useState }from 'react'
import CurrentUserService from "./CurrentUserService";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';

const EditCurrentUser = (props) => {
    const { t } = useTranslation();

    const current_user = {
        id: props.id,
        email: props.email,
        name: props.name,
        lastName: props.lastName,
        phoneNumber: props.phoneNumber,
        address: props.address,
        opis: props.opis
    };
    const [userEdit, setUserEdit] = useState({
        id: current_user.id,
        email: current_user.email,
        name: current_user.name,
        lastName: current_user.lastName,
        phoneNumber: '',
        address: '',
        opis: ''
    });

    const updateData = (e) => {
        e.preventDefault()
        userEdit.id = current_user.id
        if (userEdit.phoneNumber === "") userEdit.phoneNumber = current_user.phoneNumber
        if (userEdit.address === "") userEdit.address = current_user.address
        if (userEdit.opis === "") userEdit.opis = current_user.opis
        console.log(userEdit)
        CurrentUserService.editCurrentUser(userEdit)
            .then((response) => {
                if (response.status === 200) {
                    toast.success(t("success_data_modification"));
                    setTimeout(() => {
                        console.log('window reload from updateData')
                        window.location.reload();
                    }, 1700);

                } else {
                    toast.error(t("general_error"));
                }
            })
            .catch(error => {
                    toast.error(t("general_error"));
            });
    }
    return (
        <div data-testid="edit-current-user">
            <ToastContainer />
            <form>
                <label>{t('address')}:</label><br></br>
                <input placeholder={current_user.address} onChange={(e) => setUserEdit({...userEdit, address : e.target.value})}/><br></br>
                <label>{t('telephone')}:</label><br></br>
                <input placeholder={current_user.phoneNumber} onChange={(e) => setUserEdit({...userEdit,phoneNumber : e.target.value})}/><br></br>
                <label>{t('description')}:</label><br></br>
                <textarea
                    placeholder={current_user.opis}
                    className="form-control"
                    rows="3"
                    onChange={(e) => setUserEdit({ ...userEdit, opis: e.target.value })}
                />
                <div style={{ marginTop: '15px' }}>
                <button onClick={updateData} className='btn btn-danger'>{t('save')}</button></div>
            </form>
        </div>
    )
}

export default EditCurrentUser
