import React, { useEffect, useState }from 'react'
import "./Home.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar"
import Popup from "../GroupDisplay/Popup";
import "../GroupDisplay/abc.css"
import {useNavigate, useParams} from "react-router-dom";
import current_UserService from "./Current_UserService";
import UserComponent from "../User/UserComponent";
import EditCurrent_User from "./EditCurrent_User";
import "../User/UserInfo.scss";
import RestartPassword from '../Login/RestartPassword';

const Current_User = () => {
    const navigate = useNavigate();

    const [current_user, setCurrent_User] = useState({
        id:'',
        email: '',
        name:'',
        lastName: '',
        phoneNumber: '',
        address: '',
        role: '',
        children: [{
            id: '',
            name: '',
            classId: ''
        }]
    });
    let {id} = useParams()

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        current_UserService.getCurrent_User(id).then(response => {
            console.log('Response from main API: ',response)
            let current_userData = response.data;
            let children = current_userData.children.map(it => {return {id: it.id, name: it.name, classId: it.classId}})
            setCurrent_User({id: current_userData.id, email: current_userData.email, name: current_userData.name, lastName: current_userData.lastName, phoneNumber: current_userData.phoneNumber, address:current_userData.address, role: current_userData.role, children:  children})
        });

    }

    const[buttonPopup, setButtonPopup] = useState(false);

    return (

        <div className="home">
            <Sidebar/>
            <div className="homeContainer">

                <Navbar/>
                <div className="a">
                <h1></h1>
                <h1>Dane użytkownika:</h1>
                <label className="labels">Imie : {current_user.name} </label><br />
                <label className="labels">Nazwisko : {current_user.lastName} </label><br />
                <label className="labels" >Email : {current_user.email}</label><br />
                <label className="labels" >Telefon: </label>  <label className="labels">{current_user.phoneNumber}</label><br />
                <label className="labels">Adres: </label>  <label className="labels">{current_user.address}</label><br />
                <label className="labels">Rola: </label>  <label className="labels">{current_user.role}</label><br /> <br/>
                <button type="button" className='btn btn-info' onClick={() => setButtonPopup(true) }>Edytuj Dane</button>
                <button type="button" className='btn btn-info' onClick={() =>  navigate("restart-password")}>Zmień Hasło</button>

                 <div className="v"> <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>

                     <EditCurrent_User  {...current_user}/>

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
                                    <td>{child.name}</td>
                                    <td>{child.classId}</td>
                                </tr>
                                //<div className="col-md-12"><label className="labels">dzieci: </label>  <label className="labels">{child.name}</label></div>
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

export default Current_User