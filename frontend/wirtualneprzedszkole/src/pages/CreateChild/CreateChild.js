import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import ChildrenService from "../Children/ChildrenService";
import "../CreateUser/CreateUser.scss";
import { Link } from "react-router-dom";
import GroupService from "../GroupDisplay/GroupService";

class CreateChild extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      className: "",
      classes: [],
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeClassNameHandler = this.changeClassNameHandler.bind(this);
    this.saveChild = this.saveChild.bind(this);

  }

  componentDidMount() {
    GroupService.getGroups().then((response) => {
      const res = response.data
      this.setState(
        { classes: ["", ...res] }
      )
    });
  }

  saveChild = (e) => {
    e.preventDefault();
    let child
    if (this.state.className !== "") {
      const aClass = this.state.classes.find(element => element.name === this.state.className)
      child = JSON.stringify({
        name: this.state.name,
        lastName: this.state.lastName,
        classId: aClass.id,
      })
    } else {
      child = JSON.stringify({
        name: this.state.name,
        lastName: this.state.lastName,
      })
    }


    ChildrenService.addChild(child).then((response) => {
      if (response.data != null) {
        this.setState({ name: '', lastName: '', className: '' });
        toast.success("Dziecko zostało dodane poprawnie", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Wystąpił błąd, dziecko nie zostało dodane", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    })
      .catch((error) => {
        toast.error("Wystąpił błąd", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeClassNameHandler = (event) => {
    this.setState({ className: event.target.value });
  };



  render() {
    const {t} = this.props
    return (

      <div className="App_card">
        <ToastContainer />
        <div className="form-body">
          <form onSubmit={(e) => {
            this.saveChild(e);

          }}>
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="form-group">
                  <input
                    placeholder="Imię"
                    name="Imię"
                    required
                    className='form-control'
                    value={this.state.name}
                    onChange={this.changeNameHandler}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="form-group">
                  <input
                    placeholder="Nazwisko"
                    name="Nazwisko"
                    required
                    className='form-control'
                    value={this.state.lastName}
                    onChange={this.changeLastNameHandler}
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





            <div className="text-center">
              <Link className="button btn me-3" to={"/children"}>
              {t('come_back')}
              </Link>
              <button className="button btn">{t('save')}</button>
            </div> 
          </form>
        </div>
      </div>
    );
  }
}

export default CreateChild;
