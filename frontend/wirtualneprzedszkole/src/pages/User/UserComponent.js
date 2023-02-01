import React from "react";
import UserService from "./UserService";
import "./Table.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navi = (props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/user/" + props.value)}
      className="btn btn-info"
    >
      Zobacz
    </button>
  );
};

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchTerm: "",
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({ searchTerm: e.target.value });
  }

  deleteUser(id) {
    let userName = this.state.users.find(user => user.id === id).name;
    let userlastName = this.state.users.find(user => user.id === id).lastName;
    let emaail = this.state.users.find(user => user.id === id).email;
    if(window.confirm(`Czy na pewno chcesz usunąć użytkownika: ${userName} ${userlastName} (${emaail}) ?`)) {
      UserService.deleteUser(id).then((response) => {
        this.setState({
          users: this.state.users.filter((user) => user.id !== id),
        });
        toast.success(userName + ' ' + userlastName + " został usunięty");
      }).catch(() => {
        toast.error("Wystąpił błąd podczas usuwania użytkownika");
      });
    }
  }

  componentDidMount() {
    UserService.getUsers().then((response) => {
      this.setState({ users: response.data });
    });
  }

  render() {

    let filteredusers = this.state.users.filter((user) =>
        user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        (user.email && user.email.toLowerCase().includes(this.state.searchTerm.toLowerCase())) ||
        (user.name.toLowerCase() + " " + user.lastName.toLowerCase()).includes(this.state.searchTerm.toLowerCase())
    );


    return (
        <div data-testid="user-component"
             className="scrollable-div">
          <ToastContainer />
          <div className="abc">
            <input
                type="text"
                placeholder="Wyszukaj.."
                onChange={this.handleSearch}
            />

          </div>
          <table className="content-table">
            <thead>
            <tr className="table-head">
              <td>Id</td>
              <td>Imię</td>
              <td>Nazwisko</td>
              <td>Email</td>
              <td>Akcje</td>
            </tr>
            </thead>
            <tbody data-testid="user-name" className="body table-body">
            {filteredusers.map((user) =>(
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td >{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td className="foobar">
                    <Navi value={user.id} />
                    <button
                        onClick={() => this.deleteUser(user.id)}
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
    );
  }
}

export default UserComponent;
