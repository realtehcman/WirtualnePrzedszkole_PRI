import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/Table.scss";
import SendMessageService from "./SendMessageService";
import React, { Component } from "react";
import "../CreateUser/CreateUser.scss";
import UserService from "../User/UserService";
import "./Message.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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
                    email: "",
                    name: "",
                    id: "",
                },
            ],
            selectedUsers: [],
            filteredUsers: []
        };



        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.GetRecieverHandler = this.GetRecieverHandler.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.saveMessage2 = this.saveMessage2.bind(this);
    }




    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data });
        });
    }


    GetRecieverHandler = (event) => {
        this.setState({ to: event.target.value });
    };


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
                toast.success("wiadomość została wysłana pomyślnie", {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                toast.error("Wystąpił błąd podczas wysyłania wiadomości ", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        })
            .catch((error) => {
                toast.error("Wystąpił błąd podczas wysyłania wiadomości", {
                    position: toast.POSITION.TOP_CENTER,
                });
            });
    };




    changeNameHandler = (event) => {
        this.setState({ subject: event.target.value });
    };

    changeDescriptionHandler = (value) => {
        this.setState({ content: value });
    };

    onUserSelect = (user) => {
        this.setState({
            to: user.name + ' ' + user.lastName,
            selectedUsers: [...this.state.selectedUsers, user]
        });
    }

    saveMessage2 = (e) => {
        e.preventDefault();
        let message = JSON.stringify({
            subject: this.state.subject,
            content: this.state.content

        });
        SendMessageService.SendMessageParents(message).then((response) => {
            if (response.data != null) {
                toast.success("wiadomość została wysłana pomyślnie do wszystkich użytkowników", {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                toast.error("Wystąpił błąd podczas wysyłania wiadomości", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        })
            .catch((error) => {
                toast.error("Wystąpił błąd podczas wysyłania wiadomości", {
                    position: toast.POSITION.TOP_CENTER,
                });
            });
    };

    render() {

        const {t} = this.props

        const { to, users } = this.state;

        const filteredUsers = users.filter((user) => {
            if (to.includes(user.name + ' ' + user.lastName)) {
                return false;
            }
            const names = to.split(',').map((name) => name.trim());
            const [firstName, lastName] = names[names.length - 1].split(' ');
            return (
                (firstName && user.name.startsWith(firstName)) ||
                ((firstName && user.name.startsWith(firstName)) &&
                    (lastName && user.lastName.startsWith(lastName)))
            );
        });


        return (
            <div>

                <ToastContainer />
                <div className="App_card">
                    <h1>{t('create_a_message')}</h1>
                </div>


                <form className="App_card" onSubmit={(e) => {
                    this.saveMessage(e);

                }}>
                    <div className="mb-3">
                        <label className="form-label font16" htmlFor="name">
                        {t('down')}
                        </label>

                        <input className="form-control" type="PrettyPrintJson" autoComplete="off" id="name" value={to} onChange={this.GetRecieverHandler} />
                        {to.length > 0 && filteredUsers.length > 0 && (
                            <div className="autocomplete-options">
                                {filteredUsers.map((user, index) => (
                                    <div
                                        key={user.id}
                                        className={`autocomplete-option ${index === this.state.selectedOptionIndex ? 'selected' : ''}`}
                                        onClick={() => {
                                            const names = to.split(',').map((name) => name.trim());
                                            names[names.length - 1] = user.name + ' ' + user.lastName;
                                            this.setState({ to: names.join(',') });
                                        }}
                                    >
                                        <div key={user.id} title={user.email}>
                                            {user.name + ' ' + user.lastName}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                    <div className="mb-3">
                        <label className="form-label font16" htmlFor="email">
                        {t('topic')}
                        </label>
                        <input className="form-control" type="PrettyPrintJson" id="" value={this.state.subject}
                            onChange={this.changeNameHandler} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label font16">
                        {t('contents')}
                        </label>
                        <div className="q1-editor"><ReactQuill value={this.state.content} onChange={this.changeDescriptionHandler} /></div>
                    </div>
                    <div className="form-but d-md-flex align-items-center justify-content-center">

                        <button className="button btn w-auto me-3">{t('send')}</button>
                        <button className="button btn w-auto" onClick={(e) => {
                            this.saveMessage2(e);
                        }}>{t('send_to_all_users')}</button>
                    </div>

                </form>


            </div>
        );
    }
}

export default SendMessage
