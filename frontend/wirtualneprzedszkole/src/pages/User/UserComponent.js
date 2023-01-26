import React from "react";
import UserService from "./UserService";
import "./Table.scss";
import { useNavigate } from "react-router-dom";

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
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  loger() {
    console.log(this.state);
  }

  deleteUser(id) {
    let userName = this.state.users.find(user => user.id === id).name;
    let userlastName = this.state.users.find(user => user.id === id).lastName;
    let emaail = this.state.users.find(user => user.id === id).email;
    if(window.confirm("Czy na pewno chcesz usunąć użytkownika: "  + userName +" " + userlastName + " "+ "("+emaail+")" + " ?")) {
      UserService.deleteUser(id).then((response) => {
        this.setState({
          users: this.state.users.filter((user) => user.id !== id),
        });
      });
    }
  }

  componentDidMount() {
    UserService.getUsers().then((response) => {
      this.setState({ users: response.data });
      this.loger();
    });
  }

  render() {
    return (
        <div className="scrollable-div">
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
            <tbody className="body table-body">
            {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td className="foobar">
                    <Navi value={user.id} />
                    {/* <button onClick={() => this.props.navigation.navigate("/home//")} className='btn btn-info'>Zobacz</button> */}
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
