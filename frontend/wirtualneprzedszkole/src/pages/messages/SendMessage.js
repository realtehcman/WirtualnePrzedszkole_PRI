import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../User/Table.scss";
import SendMessageService from "./SendMessageService";
import React, {Component} from "react";
import "../CreateUser/CreateUser.scss";
import UserService from "../User/UserService";
import "./Message.scss";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import GroupService from "../GroupDisplay/GroupService";


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
                    email:"",
                    name: "",
                    id: "",
                },
            ],
            selectedUsers: [],
            filteredUsers: [],
            classes: []
        };



        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.GetRecieverHandler = this.GetRecieverHandler.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.saveMessage2 = this.saveMessage2.bind(this);
        this.saveMessage3 = this.saveMessage3.bind(this);
        this.changeClassNameHandler = this.changeClassNameHandler.bind(this);
    }




    componentDidMount() {
        UserService.getUsers().then((response) => {
            this.setState({users: response.data});

        });
        GroupService.getGroups().then((response) => {
            const res = response.data
            this.setState({classes: ["", ...res ]})
        });
    }


    GetRecieverHandler = (event) => {
        this.setState({to: event.target.value});
    };

    changeClassNameHandler = (event) => {
        this.setState({ className: event.target.value });
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
            }else {
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
        this.setState({subject: event.target.value});
    };

    changeDescriptionHandler = (value) => {
        this.setState({content: value});
    };


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
            }else {
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


    saveMessage3 = (e) => {
        e.preventDefault();
        const classID = this.state.className;
        const subject = this.state.subject;
        const content = this.state.content;
        SendMessageService.SendMessageClasses(classID, subject, content).then((response) => {
            if (response.data != null) {
                toast.success("wiadomość została wysłana pomyślnie", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }else {
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

        const { to, users } = this.state;

        const filteredUsers = users.filter((user) => {
            if (to.includes(user.name + ' ' + user.lastName)) {
                return false;
            }
            const names = to.split(',').map((name) => name.trim());
            const [firstName, lastName] = names[names.length-1].split(' ');
            return (
                (firstName && user.name.startsWith(firstName)) ||
                ((firstName && user.name.startsWith(firstName)) &&
                    (lastName && user.lastName.startsWith(lastName)))
            );
        });


        return (
            <div className="container mt-5">
                <ToastContainer />
                <h2 className="mb-3">Utwórz wiadomość</h2>
                <form onSubmit={(e) =>{
                    this.saveMessage(e);

                } }>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                            <div>
                                <select id="message-type" onChange={this.handleMessageTypeChange}>
                                    <option value="saveMessage">Do :</option>
                                    <option value="saveMessage">Save Message2</option>
                                    <option value="saveMessage2">Save Message3</option>
                                </select>
                            </div>

                        </label>

                        <input className="form-control" type="PrettyPrintJson" autoComplete="off"  id="name" value={to} onChange={this.GetRecieverHandler} />
                        {to.length > 0 && filteredUsers.length > 0 && (
                            <div className="autocomplete-options">
                                {filteredUsers.map((user, index) => (
                                    <div
                                        key={user.id}
                                        className={`autocomplete-option ${index === this.state.selectedOptionIndex ? 'selected' : ''}`}
                                        onClick={() => {
                                            const names = to.split(',').map((name) => name.trim());
                                            names[names.length-1] = user.name + ' ' + user.lastName + ',';
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
                        <label className="form-label" htmlFor="email">
                            Temat
                        </label>
                        <input className="form-control" type="PrettyPrintJson" id="" value={this.state.subject}
                               onChange={this.changeNameHandler}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Treść
                        </label>
                        <div className="q1-editor"><ReactQuill value={this.state.content} onChange={this.changeDescriptionHandler} /></div>
                    </div>
                    <div className="form-but">

                        <button className="button">Wyślij</button>
                        <button className="button" onClick={(e) =>{
                            this.saveMessage2(e);
                        } }>Wyślij do wszystkich użytkowników</button>


                        <div className="form-but">
                            <button className="button" onClick={(e) =>{
                                this.saveMessage3(e);
                            }}>Wyślij do grupy :</button>
                            <select value={this.state.className} onChange={this.changeClassNameHandler}>
                                {this.state.classes.map((aClass) => (
                                    <option key={aClass.id} value={aClass.id}> {aClass.name}</option>
                                ))}
                            </select>
                        </div>



                    </div>

                </form>


            </div>
        );
    }
}

export default SendMessage
