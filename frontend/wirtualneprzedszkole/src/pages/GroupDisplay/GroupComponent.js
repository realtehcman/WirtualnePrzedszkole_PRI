import React, { Component } from "react";
import GroupService from "./GroupService";
import "./GroupDisplay.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navi = (props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/group/" + props.value)}
      className="btn btn-info me-2 my-lg-2"
    >
      {props.t('look')}
    </button>
  );
};

class GroupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      searchTerm: "",
    };
    this.deleteGroup = this.deleteGroup.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({ searchTerm: e.target.value });
  }

  deleteGroup(id) {
    let groupName = this.state.groups.find(group => group.id === id).name;
    if (window.confirm("Czy na pewno chcesz usunąć grupę " + groupName + " ?")) {
      GroupService.deleteGroup(id)
        .then((response) => {
          this.setState({
            groups: this.state.groups.filter((group) => group.id !== id),
          });
          toast.success("Group " + groupName + " Grupa została usunięta poprawnie", {
            position: toast.POSITION.TOP_RIGHT
          });
        })
        .catch(error => {
          toast.error("Wystąpił błąd podczas usuwania grupy" + groupName + ".", {
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
    const {t} = this.props
    let filteredGroups = this.state.groups.filter((group) =>
      group.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    return (

      <div data-testid="group-component">
        <ToastContainer />
        <div className="mb-4">
          <input
            type="text"
            className="form-control border-0"
            placeholder={t('search_for_a_group_by_name')}
            onChange={this.handleSearch}
          />

        </div>
        <div className="scrollable-div maxArea">

          <table className="content-table w-100">
            <thead>
              <tr className="table-head table-head--groups">
                <td>{t('id')}</td>
                <td>{t('name')}</td>
                <td>{t('description')}</td>
                <td>{t('actions')}</td>

              </tr>
            </thead>

            <tbody className="body table-body">
              {filteredGroups.map((group) => (
                <tr key={group.id}>
                  <td id="td--groups">{group.id}</td>
                  <td id="td--groups">{group.name}</td>
                  <td id="td--groups">{group.description}</td>
                  <td id="td--groups">
                    <Navi value={group.id} t={t} />
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

export default GroupComponent;
