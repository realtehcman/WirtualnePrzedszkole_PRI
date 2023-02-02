import React, {Component} from "react";
import GroupService from "../GroupDisplay/GroupService";
import "../CreateUser/CreateUser.scss";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.saveGroup = this.saveGroup.bind(this);

  }

  saveGroup = (e) => {
    e.preventDefault();
    let group = JSON.stringify({
      name: this.state.name,
      description: this.state.description,
    });

    GroupService.addGroup(group)
        .then((response) => {
          if (response.data != null) {
            this.setState(this.state);
            toast.success("Grupa została dodana pomyślnie", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Wystąpił błąd podczas dodawania grupy", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          toast.error("Wystąpił błąd podczas dodawania grupy", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  render() {
    return (
        <div data-testid="createGroup" className="formContainer">
          <ToastContainer />
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="form-body">
                <form onSubmit={(e) =>{
                  this.saveGroup(e);
                } }>
                  <div className="form-group">
                    <input
                        placeholder="Nazwa"
                        name="Nazwa"
                        required
                        type="text"
                        className='"form-control'
                        value={this.state.name}
                        onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <input
                        placeholder="Opis"
                        name="Opis"
                        required
                        type="text"
                        value={this.state.description}
                        onChange={this.changeDescriptionHandler}
                    />
                  </div>

                  <div className="form-but">
                    <button className="button2">Zapisz</button>

                  </div>
                  <div><div className="form-but">
                    <Link className="button3" to={"/groups"}>
                      Wróć
                    </Link></div></div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default CreateGroup;
