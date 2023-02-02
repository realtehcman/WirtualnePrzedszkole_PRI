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
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import FolderService from '../Folders/FolderService';
import UserService from '../User/UserService';
import ChildrenService from '../Children/ChildrenService';
import GroupService from "../GroupDisplay/GroupService";

const CurrentUser = () => {
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
            classId: ''
        }],
        profilePicture: ''
    });

    const [group, setGroup] = useState({
        id:'',
        name: '',
        description:'',
        children: [{
            id: '',
            name: '',
            lastName: ''
        }],
        teachers: [{
            id: '',
            name: '',
            lastName: ''
        }]
    });

    let {id} = useParams()

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        CurrentUserService.getCurrentUser(id).then(response => {
            console.log('Response from main API: ',response)
            let current_userData = response.data;
            let children = current_userData.children.map(it => {return {id: it.id, name: it.name, classId: it.classId}})
            setCurrent_User({id: current_userData.id, email: current_userData.email, name: current_userData.name, lastName: current_userData.lastName, phoneNumber: current_userData.phoneNumber, address:current_userData.address, role: current_userData.role, children:  children, profilePicture: current_userData.profilePicture,opis: current_userData.opis})
        });

    }

    // const getData = async () => {
    //
    //     let className = await GroupService.getGroup(id).then(response => {
    //         //console.log('Response from main API: ',response)
    //         let groupData = response.data;
    //         let children = groupData.children.map(it => {return {id: it.id, name: it.name, lastName: it.lastName}})
    //         let teachers = groupData.teachers.map(it => {return {id: it.id, name: it.name, lastName: it.lastName}})
    //         setGroup({id: groupData.id, name: groupData.name, description: groupData.description, children:  children, teachers: teachers})
    //         return groupData.name
    //     });


    const[buttonPopup, setButtonPopup] = useState(false);

    const handleFileUpload = async (e) => {
        // profilówka ///////
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
                        {/*<img src={current_user.profilePicture} alt="zdjęcie profilowe" className="profile-img"/>*/}
                        <img
                            className="rounded-circle mt-5"
                            width="150px"
                            src="https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif"
                        />
                    </div>     <div><p></p></div>

                    <div className="button-container">
                        <button className="btn btn-info" onClick={handleFileUpload}>Załaduj zdjęcie</button>
                    </div>
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