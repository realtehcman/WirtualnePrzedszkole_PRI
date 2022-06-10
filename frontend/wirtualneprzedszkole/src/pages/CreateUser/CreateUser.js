import React, { Component } from 'react'

import UserService from '../User/UserService'
import "./CreateUser.scss"


class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            password:"Hasło123!",
            lastName: "",
            picture: "www.picture.pl",
            email: "",
            address: "",
            phoneNumber: "",
            role: "parent",
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name,password: this.state.password, lastName: this.state.lastName, email: this.state.email,picture: this.state.picture, address: this.state.address, phoneNumber: this.state.phoneNumber, role: this.state.role};
        console.log("user =>" + JSON.stringify(user))
        

        UserService.addUser(user).then(response => {
            if(response.data != null) {
                this.setState(this.state);
            }
        })
    }


    changeNameHandler = (event) => {
        this.setState({name: event.target.value})
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value})
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value})
    }

    changeAddressHandler = (event) => {
        this.setState({address: event.target.value})
    }

    changePhoneHandler = (event) => {
        this.setState({phoneNumber: event.target.value})
    }

    render() {
        return (
        


                <div className='formContainer'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <div className='form-body'>
                                <form>
                                    <div className='form-group'>
                                        <input placeholder='Imię' name="Imię" className='"form-control' 
                                        value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Nazwisko' name="Nazwisko" className='"form-control' 
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Email' name="Email" className='"form-control' 
                                        value={this.state.email} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Adres' name="Adres" className='"form-control' 
                                        value={this.state.address} onChange={this.changeAddressHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Numer Telefonu' name="Numer Telefonu" className='"form-control' 
                                        value={this.state.phoneNumber} onChange={this.changePhoneHandler}/>
                                    </div>
                                    <button className="button" onClick={this.saveUser}>Zapisz</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

        )
    }
}


export default CreateUser