import React, {Component} from "react";
import GroupService from "../GroupDisplay/GroupService";
import "../CreateUser/CreateUser.scss";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withTranslation } from "react-i18next";
import i18next from 'i18next';
const { t } = i18next;


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
            toast.success(t("success_group_addition"), {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error(t("error_group_additon"), {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
            toast.error(t("error_group_additon"), {
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
    const {t} = this.props

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
                        placeholder={t('name')}
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
                        placeholder={t('description')}
                        name="Opis"
                        required
                        type="text"
                        value={this.state.description}
                        onChange={this.changeDescriptionHandler}
                    />
                  </div>

                  <div className="form-but">
                    <button className="button btn me-3">{t('save')}</button>

                  </div>
                  <div><div className="form-but">
                    <Link className="button btn" to={"/groups"}>
                                    {t('come_back')}

                    </Link></div></div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default withTranslation()(CreateGroup);
