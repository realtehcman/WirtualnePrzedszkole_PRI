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
      };
      this.changeNameHandler = this.changeNameHandler.bind(this);
      this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
      this.changeEmailHandler = this.changeEmailHandler.bind(this);
      this.changeAddressHandler = this.changeAddressHandler.bind(this);
      this.changePhoneHandler = this.changePhoneHandler.bind(this);
      this.changeRoleHandler = this.changeRoleHandler.bind(this);
      this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
      e.preventDefault();
      let user = JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        role: this.state.role,
      });
      //user = JSON.stringify(user)

      UserService.addUser(user).then((response) => {
        if (response.data != null) {
          this.setState(this.state);
        }
      });
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



    render() {
      return (
          <div className="formContainer">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="form-body">
                  <form onSubmit={this.saveUser}>
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
                    </div><div className="asd124">
                      <button className="button">Zapisz</button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      );
    }
  }

export default CreateUser;
