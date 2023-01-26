import "../GroupDisplay/Popup.css"
import "../User/Table.scss";
import SendMessageService from "./SendMessageService";
import React, { Component } from "react";
import "../CreateUser/CreateUser.scss";
import UserService from "../User/UserService";



class SendMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            to: "",
            subject: "",
            content: "",
            messageSent: false,
            error: false,
            users: [
                {
                    name: "",
                    id: "",
                },
            ],
            selectedUsers: [],
            filteredUsers: []
        };


        this.closePopup = this.closePopup.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.GetRecieverHandler = this.GetRecieverHandler.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.saveMessage2 = this.saveMessage2.bind(this);
    }


// componentDidMount() {
// // fetch list of users from your server and set it in the state
// SendMessageService.fetchUsers().then(users => {
// this.setState({ users });
// });
// }

    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data });
            this.loger();
        });
    }


    GetRecieverHandler = (event) => {
        this.setState({ to: event.target.value });
    };




    closePopup() {
        this.setState({ messageSent: false, error: false });
    }

    saveMessage = (e) => {
        e.preventDefault();
        const to = this.state.to.split(',').map(item => item.trim());
        let message = JSON.stringify({
            to: to,
            subject: this.state.subject,
            content: this.state.content,
        });

        SendMessageService.SendMessage(message).then((response) => {
            if (response.data != null) {
                this.setState({ messageSent: true });
            }else {
                this.setState({ error: true });
            }
        });
    };



    changeNameHandler = (event) => {
        this.setState({subject: event.target.value});
    };

    changeDescriptionHandler = (event) => {
        this.setState({content: event.target.value});
    };


    saveMessage2 = (e) => {
        e.preventDefault();
        let message = JSON.stringify({
            subject: this.state.subject,
            content: this.state.content

        });
        SendMessageService.SendMessageParents(message).then((response) => {
            if (response.data != null) {
                this.setState(this.state);
            }
        });
    };


    render() {

        const { to, users } = this.state;
        const filteredUsers = to.indexOf(" ") === -1 ? users.filter(user => user.name.startsWith(to)) : users.filter(user => `${user.name} ${user.lastName}`.startsWith(to));
        return (
            <div className="container mt-5">
                <h2 className="mb-3">Utwórz wiadomość</h2>
                <form onSubmit={(e) =>{
                    this.saveMessage(e);

                } }>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                            Do :
                        </label>

                        <input className="form-control" type="PrettyPrintJson" autoComplete="off"  id="name" value={to} onChange={this.GetRecieverHandler} />
                        {to.length > 0 && filteredUsers.length > 0 && (
                            <div className="autocomplete-options">
                                {filteredUsers.map(user => (
                                    <div key={user.id} onClick={() => this.setState({ to: user.name + ' ' + user.lastName })}>
                                        {user.name + ' ' + user.lastName}
                                    </div>
                                ))}
                            </div>
                        )}


                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            Temat
                        </label>
                        <input className="form-control" type="PrettyPrintJson" id="" value={this.state.subject}
                               onChange={this.changeNameHandler} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" >
                            Treść
                        </label>
                        <textarea className="form-control" type="PrettyPrintJson" value={this.state.content}
                                  onChange={this.changeDescriptionHandler} />
                    </div>
                    <div className="form-but">

                        <button className="button">Wyślij</button>
                        <button className="button" onClick={(e) =>{
                            this.saveMessage2(e);
                        } }>Wyślij do wszystkich rodziców</button>
                    </div>

                </form>

                {this.state.messageSent &&
                    <div className="popup">
                        <div className="popup-inner">
                            Wiadomość została wysłana
                            <button className="close" onClick={this.closePopup}>X</button>
                        </div>
                    </div>
                }
                {this.state.error &&
                    <div className="popup">
                        <div className="popup-inner">
                            Wystąpił błąd. Spróbuj ponownie
                            <button className="close" onClick={this.closePopup}>X</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default SendMessage