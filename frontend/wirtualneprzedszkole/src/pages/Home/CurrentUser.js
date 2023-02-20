import React, { useEffect, useState } from 'react'
import "./CurrentUser.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Popup from "../GroupDisplay/Popup";
import "../GroupDisplay/abc.css"
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserService from "./CurrentUserService";
import EditCurrentUser from "./EditCurrentUser";
import "../User/UserInfo.scss";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import FileService from "../gallery/FileService";
import { useTranslation } from 'react-i18next';


const CurrentUser = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [current_user, setCurrent_User] = useState({
        id: '',
        email: '',
        name: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        role: '',
        opis: '',
        children: [{
            id: '',
            name: '',
            classId: ''
        }],
    });

    const [userAvatar, setUserAvatar] = useState()

    let { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            CurrentUserService.getCurrentUser(id).then(response => {
                console.log('Response from main API: ', response)
                let current_userData = response.data;
                let children = current_userData.children.map(it => { return { id: it.id, name: it.name, classId: it.classId } })
                setCurrent_User({ id: current_userData.id, email: current_userData.email, name: current_userData.name, lastName: current_userData.lastName, phoneNumber: current_userData.phoneNumber, address: current_userData.address, role: current_userData.role, children: children, opis: current_userData.opis })

                if (current_userData.picture !== undefined) {
                    FileService.getFile(-1, current_userData.picture).then(response => {
                        let urlCreator = window.URL || window.webkitURL;
                        setUserAvatar(urlCreator.createObjectURL(response.data))
                    })
                } else {
                    setUserAvatar("https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif")
                }
            });
        }
        getData()
        // eslint-disable-next-line
    }, [])

    const [buttonPopup, setButtonPopup] = useState(false);

    const addAvatar = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const file = event.currentTarget;
        formData.append('file', file);
        CurrentUserService.addAvatar(formData).then(response => {
            if (response.status !== 200) throw new Error(response.status);
            else {
                FileService.getFile(-1, response.data.picture).then(response => {
                    let urlCreator = window.URL || window.webkitURL;
                    setUserAvatar(urlCreator.createObjectURL(response.data))
                })
            }
        })

    }

    const deleteAvatar = async () => {
        CurrentUserService.deleteAvatar().then(response => {
            if (response.status !== 200) throw new Error(response.status);
            else {
                setUserAvatar("https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif")
            }
        })
    }

    return (

        <div className="home">
            <Sidebar />
            <div className="homeContainer">

                <Navbar />
                <div>
                    <ToastContainer />

                    {/* PAGE TITLE */}
                    <div className='App_card'>
                        <h1>{t('user_data')}</h1>
                    </div>

                    <div className='row'>
                        <div className='col-xl-4 col-md-6 col-12'>
                            <div className='App_card'>
                                {/* USER IMAGE SECTION BEGINS*/}
                                <div className="img-container text-center mb-4">
                                    <img src={userAvatar} alt="zdjęcie profilowe" className="rounded-circle user_img" />

                                    {/* <img alt="cute-cat"
                                        className="rounded-circle" width="150px" height="150px"
                                        src="https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif"
                                    /> */}
                                </div>

                                {/* BUTTONS AFTER USER IMAGE SECTION BEGINS */}
                                <div className="button-container">
                                    <div className="uploadAvatar">
                                        <form onSubmit={addAvatar} encType='multipart/form-data'>
                                            <div>
                                                <input type="file" className="form-control" id="customFile" name='file' multiple />
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center mt-4 gap10'>
                                                <button type="submit" className="btn btn_global">{t('change_profile')}</button>
                                                <button className="btn btn-danger" onClick={() => deleteAvatar()}>{t('delete_profile')}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-8 col-md-6 col-12'>
                            <div className='App_card'>
                                <div className='row mb-2'>
                                    <div className='col-md-2 col-12'>
                                        <label class="fw-bold">{t('name')}:</label>
                                    </div>
                                    <div className='col-md-10 col-12'>
                                        <p className="labels mb-0">{current_user.name}</p>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='col-md-2 col-12'>
                                        <label class="fw-bold">{t('last_name')}:</label>
                                    </div>
                                    <div className='col-md-10 col-12'>
                                        <p className="labels mb-0">{current_user.lastName}</p>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='col-md-2 col-12'>
                                        <label class="fw-bold">{t('email')}:</label>
                                    </div>
                                    <div className='col-md-10 col-12'>
                                        <p className="labels mb-0">{current_user.email}</p>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='col-md-2 col-12'>
                                        <label class="fw-bold">{t('telephone')}:</label>
                                    </div>
                                    <div className='col-md-10 col-12'>
                                        <p className="labels mb-0">{current_user.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='col-md-2 col-12'>
                                        <label class="fw-bold">{t('address')}:</label>
                                    </div>
                                    <div className='col-md-10 col-12'>
                                        <p className="labels mb-0">{current_user.address}</p>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='col-md-2 col-12'>
                                        <label class="fw-bold">{t('role')}:</label>
                                    </div>
                                    <div className='col-md-10 col-12'>
                                        <p className="labels mb-0">{current_user.role}</p>
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='col-md-2 col-12'>
                                        <label class="fw-bold">{t('description')}</label>
                                    </div>
                                    <div className='col-md-10 col-12'>
                                        <p className="labels mb-0">{current_user.opis}</p>
                                    </div>
                                </div>

                                <div className='mt-5 d-flex'>
                                    <button type="button" className='btn btn_global me-3' onClick={() => setButtonPopup(true)}>{t('edit_data')}</button>
                                    <button type="button" className='btn btn-info' onClick={() => navigate("restart-password")}>{t('change_password')}</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="v"> <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>

                        <EditCurrentUser  {...current_user} />

                    </Popup></div>



                    <div className='row'>
                        <div className='col-12'>
                            <div className='App_card'>
                                <h1>{t('kids')}</h1>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-12'>
                            <div className='App_card'>
                                <table className="children">
                                    <thead>
                                        <tr>
                                            <th>{t('name')}</th>
                                            <th>{t('class_name')}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {current_user.children.map((child) => (
                                            <tr>

                                                <td className="clickable"
                                                    onClick={() => navigate("/child/" + child.id)}>{child.name}</td>
                                                <td className="clickable"
                                                    onClick={() => navigate("/child/" + child.id)}>{child.classId}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//     return (
//
//         <div className="home">
//             <Sidebar/>
//             <div className="homeContainer">
//
//                 <Navbar/>
//                 <div className="a">
//                     <h1></h1>
//                     <h1>Dane użytkownika:</h1>
//                     <label className="labels">Imie : {current_user.name} </label><br />
//                     <label className="labels">Nazwisko : {current_user.lastName} </label><br />
//                     <label className="labels" >Email : {current_user.email}</label><br />
//                     <label className="labels" >Telefon:
//                         {current_user.phoneNumber}</label><br />
//                     <label className="labels" >Adres: {current_user.address}</label><br />
//                     <label className="labels" >Rola: {current_user.role}</label><br />
//                     <label className="labels" >Dzieci:</label>
//                     {current_user.children.map((child, index) => {
//                         return (
//                             <div key={index}>
//                                 <label className="labels" >Imie: {child.name}</label><br />
//                                 <label className="labels" >Klasa: {child.classId}</label><br />
//                             </div>
//                         )
//                     })}
//                     <div className="img-container">
//                         <img src={current_user.profilePicture} alt="User Profile" className="profile-img"/>
//                     </div>
//                     <div className="button-container">
//                         <button type="button" className='btn btn-info' onClick={() => setButtonPopup(true) }>Edytuj Dane</button>
//                         <button className="upload-button" onClick={handleFileUpload}>Załaduj zdjęcie</button>
//                     </div>
//                     {buttonPopup ? <Popup closePopup={() => setButtonPopup(false)}> <EditCurrent_User current_user={current_user}/></Popup> : null}
//                 </div>
//             </div>
//         </div>
//     )
// }

export default CurrentUser;