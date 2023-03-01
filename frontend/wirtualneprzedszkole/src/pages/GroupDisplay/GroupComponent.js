import React, {Component} from "react";
import GroupService from "./GroupService";
import "./GroupDisplay.scss";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withTranslation } from "react-i18next";
import i18next from 'i18next';
const { t } = i18next;


const Navi = (props) => {
  const { t } = i18next;
  
  const navigate = useNavigate();
  return (
      <button
          onClick={() => navigate("/group/" + props.value)}
          className="btn btn-info"
      >
      {t('look')}

      </button>
  );
};

class GroupComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      searchTerm: "",
      sortAsc: true,
    };
    this.deleteGroup = this.deleteGroup.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({ searchTerm: e.target.value });
  }

  deleteGroup(id) {
    let groupName = this.state.groups.find(group => group.id === id).name;
    if(window.confirm(t("confirm_group_deletion")+ " " + groupName + " ?")) {
      GroupService.deleteGroup(id)
          .then((response) => {
            this.setState({
              groups: this.state.groups.filter((group) => group.id !== id),
            });
            toast.success(t("general_group") + " " + groupName + " " + t("success_deletion"), {
              position: toast.POSITION.TOP_RIGHT
            });
          })
          .catch(error => {
            toast.error(t("error_group_deletion") + " "  + groupName + ".", {
              position: toast.POSITION.TOP_RIGHT
            });
          });
    }
  }

  componentDidMount() {
    GroupService.getGroups().then((response) => {
      this.setState({ groups: response.data });
    });
  }

  render() {
    const { t } = i18next;

    let filteredGroups = this.state.groups.filter((group) =>
        group.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    return (

        <div className="scrollable-div1">
          <div className="abc">
            <input
                type="text"
                placeholder={t('search_for_a_group_by_name')}
                onChange={this.handleSearch}
            />
          </div>
          <div className="table-container">

            <ToastContainer />
            <table className="content-table">

              <thead>

              <tr className="table-head table-head--groups">
                <td>{t('name')}</td>
                <td>{t('description')}</td>
                <td>{t('actions')}</td>
              </tr>
              </thead>
              <tbody className="body table-body">
              {filteredGroups.map((group) => (
                  <tr key={group.id}>
                    <td id="td--groups">{group.name}</td>
                    <td id="td--groups">{group.description}</td>
                    <td id="td--groups">
                      <Navi value={group.id} />
                      <button
                          onClick={() => this.deleteGroup(group.id)}
                          className="btn btn-danger"
                      >
                      {t('delete')}
                      </button>
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

export default withTranslation()(GroupComponent);
