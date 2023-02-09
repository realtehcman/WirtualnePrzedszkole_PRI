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
            <div className="scrollable-div">
            <div className="table-body32">
                <ToastContainer />
                <div className="abc">
                    <input
                        type="text"
                        placeholder="Wyszukaj.."
                        onChange={this.handleSearch}
                    />
                </div>
                <table className="content-table32">
                    <tbody>
                    {filteredusers.map((user) => (
                        <tr key={user.id}>
                            <td id="td--message32">
                                <img alt="cute-cat"
                                    className="rounded-circle mt-5"
                                    width="150px"
                                    src="https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif"
                                />
                                <br /> <br />
                                {user.name}  {user.lastName}  <br /> <br /> ({user.email})
                                <br /> <br />
                                Nr telefonu: {user.phoneNumber}
                                <br /> <br />
                                o mnie : <br /> <br />
                                {user.opis}
                                <br /> <br />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div></div>
        );
    }
}

export default Kadra;
