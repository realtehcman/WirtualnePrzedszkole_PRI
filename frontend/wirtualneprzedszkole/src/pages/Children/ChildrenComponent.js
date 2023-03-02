import React from "react";
import ChildrenService from "./ChildrenService";
import "../User/Table.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withTranslation } from "react-i18next";
import i18next from 'i18next';
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";

const { t } = i18next;

const Navi = (props) => {
  const { t } = i18next;

  const navigate = useNavigate();
  return (
      <button
          onClick={() => navigate("/child/" + props.value)}
          className="btn btn-info"
      >
        {t('look')}
      </button>
  );
};

const Navi2 = (props) => {
  const { t } = i18next;

  const navigate = useNavigate();
  return (
      <button
          onClick={() => navigate("/EditChild/" + props.value)}
          className="btn btn-info"
      >
        {t('edit_data')}
      </button>
  );
};

class ChildrenComponent extends React.Component {
    static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      searchTerm: "",
    };
    this.deleteChild = this.deleteChild.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }
  handleSearch(e) {
    this.setState({ searchTerm: e.target.value });
  }

  loger() {
    console.log(this.state);
  }


  deleteChild(id) {
    let childName = this.state.children.find(child => child.id === id).name;
    let childlastName = this.state.children.find(child => child.id === id).lastName;
      if (window.confirm(t("confirm_user_deletion") +" " + childName + " " + childlastName + " ?")) {
      ChildrenService.deleteChild(id).then((response) => {
        this.setState({
          children: this.state.children.filter((child) => child.id !== id),
        });
        toast.success(t("success_child_deletion") + " " + childName + " " + childlastName);
      }).catch(() => {
        toast.error(t("error_child_deletion") + " " + childName + " " + childlastName);
      });
    }
  }



  componentDidMount() {
    ChildrenService.getChildren().then((response) => {
      this.setState({ children: response.data });
      this.loger();
    });
  }

  render() {
    const { t } = i18next;

    let filteredchildren = this.state.children.filter((child) =>
        child.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        child.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        (child.classId && child.classId.toString().includes(this.state.searchTerm.toLowerCase())) ||
        (child.name.toLowerCase() + " " + child.lastName.toLowerCase()).includes(this.state.searchTerm.toLowerCase())
    );

      const current_user = this.context;
    return (
        <div data-testid="children-component" className="scrollable-div1">

          <div className="abc">
            <input
                type="text"
                placeholder={t('search')}
                onChange={this.handleSearch}
            />

          </div>
          <div className="table-container">
          <ToastContainer position="top-center" />

          <table className="content-table">
            <thead>
            <tr className="table-head">

                <td>{t('name')}</td>
                <td>{t('last_name')}</td>
                <td>{t('group')}</td>
                <td>{t('actions')}</td>
            </tr>
            </thead>
            <tbody className="body">
            {filteredchildren.map((child) =>(
                <tr key={child.id}>

                  <td id="td--children">{child.name}</td>
                  <td id="td--children">{child.lastName}</td>
                  <td id="td--children">{child.className}</td>
                  <td id="td--children">
                    <Navi value={child.id} />


                      {current_user.role === "ADMIN" &&

                    <Navi2 value={child.id} />}

                      {current_user.role === "ADMIN" &&    <button
                        onClick={() => this.deleteChild(child.id)}
                        className="btn btn-danger"
                    >
                      {i18next.t('delete')}

                    </button>}



                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        </div>
    );
  }
}

export default withTranslation()(ChildrenComponent);
