import React, { Component } from "react";

import UserService from "../User/UserService";
import "./CreateUser.scss";
import { Link } from "react-router-dom";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBValidation,
  MDBValidationItem
} from 'mdb-react-ui-kit';
import { display } from "@mui/system";


  class CreateUser extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        name: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        role: "PARENT",
        users: [],
        childName: "",
        childLastName: "",
        class: "",
        children: [],
        display: 1
      };
      this.changeNameHandler = this.changeNameHandler.bind(this);
      this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
      this.changeEmailHandler = this.changeEmailHandler.bind(this);
      this.changeAddressHandler = this.changeAddressHandler.bind(this);
      this.changePhoneHandler = this.changePhoneHandler.bind(this);
      this.changeRoleHandler = this.changeRoleHandler.bind(this);
      this.saveUser = this.saveUser.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    saveUser = (e) => {
      e.preventDefault();
      console.log(e.nativeEvent.submitter.name)
      let user = JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        role: this.state.role,
      });
      //user = JSON.stringify(user)
      this.state.users.push(user)

      this.setState({name: ""});
      this.setState({lastName: ""});
      this.setState({email: ""});
      this.setState({address: ""});
      this.setState({phoneNumber: ""});
      this.setState({role: ""});
      //this.setState({display: 0})
      console.log(this.state.users)
      console.log(this.state.display)
      /* UserService.addUser(user).then((response) => {
        if (response.data != null) {
          this.setState(this.state);
        }
      }); */
    };

    changeNameHandler = (event) => {
      this.setState({name: event.target.value});
    };

    changeLastNameHandler = (event) => {
      this.setState({lastName: event.target.value});
    };

    changeEmailHandler = (event) => {
      this.setState({email: event.target.value});
    };

    changeAddressHandler = (event) => {
      this.setState({address: event.target.value});
    };

    changePhoneHandler = (event) => {
      this.setState({phoneNumber: event.target.value});
    };

    changeRoleHandler = (event) => {
      this.setState({role: event.target.value});
    };
    handleSubmit(e) {
      alert('Użytkownik został dodany : ' + '\n' + " Imię : " + this.state.name + '\n' + " Nazwisko : " + this.state.lastName + '\n' + " Email : " + this.state.email+ '\n' + " Adres : " + this.state.address + '\n' + " Numer telefonu : " + this.state.phoneNumber + '\n' + " Rola : " + this.state.role);
      e.preventDefault();
    }

    render() {
      const display = this.state.display
      if (display === 1) {
      return (
          <div className="formContainer">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="form-body">
                  <form onSubmit={(e) =>{
                    this.saveUser(e);
                    /* this.handleSubmit(e); */
                  } }>
                    <div className="form-group">
                      <MDBInput
                          placeholder="Imię"
                          type="text"
                          required
                          name="Imię"
                          className='"form-control'
                          value={this.state.name}
                          onChange={this.changeNameHandler}
                      />
                    </div>
                    <div className="form-group">
                      <MDBInput
                          placeholder="Nazwisko"
                          type="text"
                          required
                          name="Nazwisko"
                          className='"form-control'
                          value={this.state.lastName}
                          onChange={this.changeLastNameHandler}
                      />
                    </div>
                    <div className="form-group">
                      <MDBInput
                          placeholder="Email"
                          type="email"
                          required
                          name="Email"
                          className='"form-control'
                          value={this.state.email}
                          onChange={this.changeEmailHandler}
                      />
                    </div>
                    <div className="form-group">
                      <MDBInput
                          placeholder="Adres"
                          required
                          name="Adres"
                          className='"form-control'
                          value={this.state.address}
                          onChange={this.changeAddressHandler}
                      />
                    </div>
                    <div className="form-group">
                      <MDBInput
                          placeholder="Numer Telefonu"
                          type="tel"
                          pattern="[0-9]{3}[0-9]{3}[0-9]{3}"

                          required
                          name="Numer Telefonu"

                          value={this.state.phoneNumber}
                          onChange={this.changePhoneHandler}
                      />
                    </div>
                    <div className="form-group">
                      <select
                          id="lang"
                          value={this.state.role}
                          onChange={this.changeRoleHandler}
                      >
                        <option value="PARENT">Rodzic</option>
                        <option value="TEACHER">Nauczyciel</option>
                        <option value="ADMIN">Administrator</option>
                      </select>
                    </div>
                    <div className="asd123">

                      <Link className="button" to={"/users"}>
                        Wróć
                      </Link>
                    </div>
                    <div className="asd124">
                      <button className="button" name="zapisz">Zapisz</button>
                    </div>
                    <div className="next-parent">
                      <button className="button">Dodaj następnego opiekuna</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      );
    } else {
      return (
        <div className="formContainer">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="form-body">
                <form onSubmit={(e) =>{
                  this.saveUser(e);
                  this.handleSubmit(e);
                } }>
                  <div className="form-group">
                    <MDBInput
                        placeholder="imię"
                        type="text"
                        required
                        name="imię"
                        className='"form-control'
                        value={this.state.name}
                        onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <MDBInput
                        placeholder="Nazwisko"
                        type="text"
                        required
                        name="Nazwisko"
                        className='"form-control'
                        value={this.state.lastName}
                        onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="asd123">

                    <Link className="button" to={"/users"}>
                      Wróć
                    </Link>
                  </div>
                  <div className="asd124">
                    <button className="button">Zapisz</button>
                  </div>
                  <div className="next-child">
                    <button className="button">Dodaj następne dziecko</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
    }
  }
  }

export default CreateUser;
