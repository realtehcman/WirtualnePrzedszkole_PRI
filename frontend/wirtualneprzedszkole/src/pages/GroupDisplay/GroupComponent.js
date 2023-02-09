import React, {Component} from "react";
import GroupService from "./GroupService";
import "./GroupDisplay.scss";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Navi = (props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/group/" + props.value)}
      className="btn btn-info"
    >
      Zobacz
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
    if(window.confirm("Czy na pewno chcesz usunąć grupę " + groupName + " ?")) {
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
    let filteredGroups = this.state.groups.filter((group) =>
        group.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    return (

        <div data-testid="group-component" className="scrollable-div">
          <ToastContainer />
          <div className="abc">
            <input
                type="text"
                placeholder="Wyszukaj grupę po nazwie"
                onChange={this.handleSearch}
            />

          </div>
          <div>

            <table className="content-table">
              <thead>
              <tr className="table-head table-head--groups">
                <td>Id</td>
                <td>Nazwa</td>
                <td>Opis</td>
                <td>Akcje</td>

              </tr>
            </thead>

            <tbody className="body table-body">
            {filteredGroups.map((group) => (
                <tr key={group.id}>
                  <td id="td--groups">{group.id}</td>
                  <td id="td--groups">{group.name}</td>
                  <td id="td--groups">{group.description}</td>
                  <td id="td--groups">
                    <Navi value={group.id} />
                    <button
                        onClick={() => this.deleteGroup(group.id)}
                        className="btn btn-danger"
                    >
                      Usuń
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
