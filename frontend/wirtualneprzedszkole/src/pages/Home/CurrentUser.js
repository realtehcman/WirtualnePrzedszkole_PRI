import React, { useEffect, useState }from 'react'
import "./CurrentUser.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Popup from "../GroupDisplay/Popup";
import "../GroupDisplay/abc.css"
import {useNavigate, useParams} from "react-router-dom";
import CurrentUserService from "./CurrentUserService";
import EditCurrentUser from "./EditCurrentUser";
import "../User/UserInfo.scss";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import FileService from "../gallery/FileService"


const CurrentUser = () => {
    const [userAvatar, setUserAvatar] = useState("https://www.christchurchandstmarys.co.uk/images/nophoto.jpg");
    const [file, setFile] = useState();
    const navigate = useNavigate();

    const [current_user, setCurrent_User] = useState({
        id:'',
        email: '',
        name:'',
        lastName: '',
        phoneNumber: '',
        address: '',
        role: '',
        opis: '',
        children: [{
            id: '',
            name: '',
            classId: '',


        }],
    });


    let {id} = useParams()

    useEffect(() => {
        const getData = async () => {
            CurrentUserService.getCurrentUser(id).then(response => {
                console.log('Response from main API: ',response)
                let current_userData = response.data;
                let children = current_userData.children.map(it => {return {id: it.id, name: it.name, classId: it.classId}})
                setCurrent_User({id: current_userData.id, email: current_userData.email, name: current_userData.name, lastName: current_userData.lastName, phoneNumber: current_userData.phoneNumber, address:current_userData.address, role: current_userData.role, children:  children, opis: current_userData.opis})

                if (current_userData.picture !== undefined) {
                    FileService.getFile(-1, current_userData.picture).then(response => {
                        let urlCreator = window.URL || window.webkitURL;
                        setUserAvatar(urlCreator.createObjectURL(response.data))
                    })
                } else {
                    setUserAvatar("https://www.christchurchandstmarys.co.uk/images/nophoto.jpg")
                }
            });
        }
        getData()

    }, [])

    const[buttonPopup, setButtonPopup] = useState(false);

    const addAvatar = async(formData) => {
        CurrentUserService.addAvatar(formData).then(response => {
            if (response.status !== 200) throw new Error(response.status);
            else
            {
                FileService.getFile(-1, response.data. picture).then(response => {
                    let urlCreator = window.URL || window.webkitURL;
                    setUserAvatar(urlCreator.createObjectURL(response.data))
                })

            }
        })
    }

    const deleteAvatar = async() => {
        CurrentUserService.deleteAvatar().then(response => {
            if (response.status !== 200) throw new Error(response.status);
            else {
                setUserAvatar("https://www.christchurchandstmarys.co.uk/images/nophoto.jpg")
            }
        })
    }


    return (

        <div className="home">
            <Sidebar/>
            <div className="homeContainer">

                <Navbar/>
                <div>
                    <ToastContainer />

                    <h1>Dane użytkownika: </h1>

                    <div className="img-container">
                        <img
                            src={userAvatar}
                            alt="Zdjęcie profilowe"
                            className="rounded-circle mt-5"
                            width="150px"
                            onClick={() => {
                                const input = document.createElement("input");
                                input.type = "file";
                                input.accept = "image/*";
                                input.onchange = (e) => {
                                    setFile(e.target.files[0]);
                                    const formData = new FormData();
                                    formData.append('file', e.target.files[0]);
                                    addAvatar(formData);
                                };
                                input.click();
                            }}
                            title="Zmień zdjęcie"
                        />
                    </div>

                    <div><p></p></div>
                    <button className="btn btn-danger" onClick={() => deleteAvatar()}>Usuń Profilowe</button>

                    <div><p></p></div>


                    <label className="labels">Imie : {current_user.name} </label><br />
                    <label className="labels">Nazwisko : {current_user.lastName} </label><br />
                    <label className="labels" >Email : {current_user.email}</label><br />
                    <label className="labels" >Telefon: </label>  <label className="labels">{current_user.phoneNumber}</label><br />
                    <label className="labels">Adres: </label>  <label className="labels">{current_user.address}</label><br />
                    <label className="labels">Rola: </label>  <label className="labels">{current_user.role}</label><br />
                    <label className="labels">Opis: </label>  <label className="labels">{current_user.opis}</label><br /> <br/>
                    <button type="button" className='btn btn-info' onClick={() => setButtonPopup(true) }>Edytuj Dane</button>
                    <button type="button" className='btn btn-info' onClick={() =>  navigate("restart-password")}>Zmień Hasło</button>


                    <div className="v"> <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>

                        <EditCurrentUser  {...current_user}/>

                    </Popup></div>


                    <div className="fixt">
                        <div className="col-md-12">
                            <h1>Dzieci: </h1>
                            <table className="children">
                                <thead>
                                <tr>
                                    <th>Imię</th>
                                    <th>classId</th>
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
    )

}


export default CurrentUser;