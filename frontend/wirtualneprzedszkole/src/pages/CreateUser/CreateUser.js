import React, { Component } from "react";
import ChildrenService from "../Children/ChildrenService"
import UserService from "../User/UserService";
import "./CreateUser.scss";
import { MDBInput } from 'mdb-react-ui-kit';
import GroupService from "../GroupDisplay/GroupService";


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
      classes: [],
      className: "",
      display: 1,
      isClose: false,
      opis: ""
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changePhoneHandler = this.changePhoneHandler.bind(this);
    this.changeRoleHandler = this.changeRoleHandler.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeChildNameHandler = this.changeChildNameHandler.bind(this);
    this.changeChildLastNameHandler = this.changeChildLastNameHandler.bind(this)
    this.changeClassNameHandler = this.changeClassNameHandler.bind(this)
  }

  componentDidMount() {
    GroupService.getGroups().then((response) => {
      const res = response.data
      this.setState(
        { classes: ["", ...res] }
      )

    });
  }

  saveUser = (e) => {
    e.preventDefault();
    console.log(e.nativeEvent.submitter.name)
    if (e.nativeEvent.submitter.name === "save-user") {
      let user = JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        role: this.state.role,
        opis: this.state.opis
      });
      //user = JSON.stringify(user)
      //this.state.users.push(user)

      UserService.addUser(user).then((response) => {
        if (response.status !== 200) throw new Error(response.status);
        else {
          window.open("users", "_self");
        }
      })

    }
    else if (e.nativeEvent.submitter.name === "next-parent") {
      let user = JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        role: this.state.role,
      });
      //user = JSON.stringify(user)
      //this.state.users.push(user)

      this.setState({ name: "" });
      this.setState({ lastName: "" });
      this.setState({ email: "" });
      this.setState({ address: "" });
      this.setState({ phoneNumber: "" });
      //this.setState({display: 0})
      console.log(this.state.users)
      console.log(this.state.display)
      UserService.addUser(user).then((response) => {
        console.log(response)
        this.state.users.push(response.data)
      })
    }

    else if (e.nativeEvent.submitter.name === "add-child") {
      let user = JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        role: this.state.role,
      });
      //user = JSON.stringify(user)
      //this.state.users.push(user)
      this.setState({ display: 0 })
      UserService.addUser(user).then((response) => {
        this.state.users.push(response.data)
      })
    } else if (e.nativeEvent.submitter.name === "next-child") {
      let child
      if (this.state.className !== "") {
        const aClass = this.state.classes.find(element => element.name === this.state.className)
        child = JSON.stringify({
          name: this.state.childName,
          lastName: this.state.childLastName,
          classId: aClass.id,
        })
      } else {
        child = JSON.stringify({
          name: this.state.childName,
          lastName: this.state.childLastName,
        })
      }
      //this.state.children.push(child)

      this.setState({ childName: "" });
      this.setState({ childLastName: "" });

      console.log(this.state.children)
      console.log(this.state.users)
      ChildrenService.addChild(child).then((response) => {
        console.log(response)
        this.state.children.push(response.data)
      })
    } else {
      let child
      if (this.state.className !== "") {
        const aClass = this.state.classes.find(element => element.name === this.state.className)
        child = JSON.stringify({
          name: this.state.childName,
          lastName: this.state.childLastName,
          classId: aClass.id,
        })
      } else {
        child = JSON.stringify({
          name: this.state.childName,
          lastName: this.state.childLastName,
        })
      }
      //this.state.children.push(child)

      ChildrenService.addChild(child).then((response) => {
        console.log(response)
        this.state.children.push(response.data)


        this.state.users.forEach((parent) => {
          UserService.addChildrenToUser(parent.id, this.state.children).then((response) => {
            console.log(response)
            if (response.status !== 200) throw new Error(response.status);
          })
        })
      })

    }
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };

  changePhoneHandler = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  changeRoleHandler = (event) => {
    this.setState({ role: event.target.value });
  };
  handleSubmit(e) {
    alert(`Użytkownik został dodany : 
 Imię : ${this.state.name}
 Nazwisko : ${this.state.lastName}
 Email : ${this.state.email}
 Adres : ${this.state.address}
 Numer telefonu : ${this.state.phoneNumber}
 Rola : ${this.state.role}`);
    e.preventDefault();
  }

  changeChildNameHandler = (event) => {
    this.setState({ childName: event.target.value })
  }

  changeChildLastNameHandler = (event) => {
    this.setState({ childLastName: event.target.value })
  }

  changeClassNameHandler = (event) => {
    this.setState({ className: event.target.value })
  }

  render() {
    const {t} = this.props
    const display = this.state.display
    if (display === 1) {
      if (this.state.role === "PARENT") {
        return (
          <div data-testid="create-user">

            <div className="App_card">
              <div className="form-body">
                <form onSubmit={(e) => {
                  this.saveUser(e);
                  this.handleSubmit(e);
                }}>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <MDBInput
                          placeholder={t('name')}
                          type="text"
                          required="required"
                          name="Imię"
                          className='form-control'
                          value={this.state.name}
                          onChange={this.changeNameHandler}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <MDBInput
                          placeholder={t('last_name')}
                          type="text"
                          required
                          name="Nazwisko"
                          className='"form-control'
                          value={this.state.lastName}
                          onChange={this.changeLastNameHandler}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <MDBInput
                          placeholder={t('email')}
                          type="email"
                          required
                          name="Email"
                          className='"form-control'
                          value={this.state.email}
                          onChange={this.changeEmailHandler}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <MDBInput
                          placeholder={t('address')}
                          required
                          name="Adres"
                          className='"form-control'
                          value={this.state.address}
                          onChange={this.changeAddressHandler}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <MDBInput
                          placeholder={t('phone_no')}
                          type="tel"
                          pattern="[0-9]{3}[0-9]{3}[0-9]{3}"

                          required
                          name="Numer Telefonu"

                          value={this.state.phoneNumber}
                          onChange={this.changePhoneHandler}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <select
                          id="lang"
                          className="form-select"
                          value={this.state.role}
                          onChange={this.changeRoleHandler}
                        >
                          <option value="PARENT">{t('parent')}</option>
                          <option value="TEACHER">{t('teacher')}</option>
                          <option value="ADMIN">{t('administrator')}</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="Form_btns">
                    <button className="button btn my-0" name="save-user">{t('save')}</button>
                    <button className="button btn my-0" name="next-parent">{t('save_and_add_another_guardian')}</button>
                    <button className="button btn my-0" name="add-child">{t('save_and_add_a_child')}</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        );
      } else {
        return (
          <div data-testid="create-user" className="formContainer">
            <div className="form-body">
              <form onSubmit={(e) => {
                this.saveUser(e);
                this.handleSubmit(e);
              }}>
                <div className="form-group">
                  <MDBInput
                    placeholder="Imię"
                    type="text"
                    required
                    name="Imię"
                    className='form-control'
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
                    className='form-control'
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
                    className='form-control'
                    value={this.state.email}
                    onChange={this.changeEmailHandler}
                  />
                </div>
                <div className="form-group">
                  <MDBInput
                    placeholder="Adres"
                    required
                    name="Adres"
                    className='form-control'
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
                <div className="asd124">
                  <button className="button" name="save-user">Zapisz</button>
                </div>
              </form>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="App_card">
          <div className="form-body">
            <form onSubmit={(e) => {
              this.saveUser(e);
              //this.handleSubmit(e);
            }}>
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <MDBInput
                      placeholder="imię"
                      type="text"
                      required
                      name="imię"
                      className='"form-control'
                      value={this.state.childName}
                      onChange={this.changeChildNameHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="form-group">
                    <MDBInput
                      placeholder="Nazwisko"
                      type="text"
                      required
                      name="Nazwisko"
                      className='"form-control'
                      value={this.state.childLastName}
                      onChange={this.changeChildLastNameHandler}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <select value={this.state.className} className="form-select" onChange={this.changeClassNameHandler}>
                      {this.state.classes.map((aClass) => (
                        <option key={aClass.id}> {aClass.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>



              <div className="row">
                <div className="text-center col-12">
                  <button className="button btn me-3" name="save-with-child">Zapisz</button>
                  <button className="button btn" name="next-child">Zapisz i dodaj następne dziecko</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default CreateUser;
