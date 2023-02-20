import React, { useState } from 'react'
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
        phoneNumber: current_user.phoneNumber,
        address: current_user.address,
        opis: current_user.opis
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
                    toast.success("Dane zostały zmienione poprawnie");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1700);

                } else {
                    toast.error("Wystąpił błąd podczas edycji, upewnij się że dane zostały wprowadzone poprawnie");
                }
            })
            .catch(error => {
                toast.error("Wystąpił błąd podczas edycji, upewnij się że dane zostały wprowadzone poprawnie");
            });
    }
    return (
        <div data-testid="edit-current-user">
            <ToastContainer />
            <form className='pt-3'>
                <div className='row mb-3'>
                    <div className='col-md-3 col-12'>
                        <label>{t('address')}:</label>
                    </div>
                    <div className='col-md-9 col-12'>
                        <input placeholder={t('address')} value={userEdit.address} className="form-control border-0" onChange={(e) => setUserEdit({ ...userEdit, address: e.target.value })} />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-md-3 col-12'>
                        <label>{t('telephone')}:</label>
                    </div>
                    <div className='col-md-9 col-12'>
                        <input placeholder={t('telephone')} value={userEdit.phoneNumber} className="form-control mb-3 border-0" onChange={(e) => setUserEdit({ ...userEdit, phoneNumber: e.target.value })} />
                        <input placeholder={t('description')} value={userEdit.opis} className="form-control border-0" onChange={(e) => setUserEdit({ ...userEdit, opis: e.target.value })} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12 text-center'>
                    <button onClick={updateData} className='btn btn_global'>{t('save')}</button>
                    </div>
                </div>




                
            </form>
        </div>
    )
}

export default EditCurrentUser
