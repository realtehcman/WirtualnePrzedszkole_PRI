import React from "react";
import UserService from "../User/UserService";
import "./Kadra.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class Kadra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            searchTerm: "",
        };

        this.handleSearch = this.handleSearch.bind(this);
    }
    handleSearch(e) {
        this.setState({ searchTerm: e.target.value });
    }
    loger() {
        console.log(this.state);
    }

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data });
            this.loger();
        });
    }

    render() {
        let filteredusers = this.state.users.filter(
            (user) =>
                user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (user.email && user.email.toLowerCase().includes(this.state.searchTerm.toLowerCase())) ||
                (user.name.toLowerCase() + " " + user.lastName.toLowerCase()).includes(this.state.searchTerm.toLowerCase())
        );

        filteredusers = filteredusers.filter((user) => user.role === "TEACHER");

        return (
            <div>
                <div className="table-body32">
                    <ToastContainer />
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Wyszukaj.."
                            onChange={this.handleSearch}
                        />
                    </div>
                    <div className="scrollable-div">
                        <table className="content-table w-100">
                            <thead>
                                <tr className="table-head">
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                    <th>About Me</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredusers.map((user) => (
                                    <tr key={user.id}>
                                        <td id="td--message32"> 
                                            <img alt="cute-cat"
                                                className="rounded-circle" width="75px"
                                                src="https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif"
                                            />
                                            </td>
                                        <td>
                                            <p>{user.name}</p>
                                        </td>
                                        <td>
                                            <p>{user.lastName}</p>
                                        </td>
                                        <td>
                                            <p>{user.email}</p>
                                        </td>
                                        <td>
                                            <p>{user.phoneNumber}</p>
                                        </td>
                                        <td>
                                            <p>{user.opis}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export default Kadra;
