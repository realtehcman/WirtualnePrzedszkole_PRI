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
import {useContext} from "react";
import UserContext from "../../components/sidebar/UserContext";
import { withTranslation } from "react-i18next";
import i18next from 'i18next';
const { t } = i18next;

class SendMessage extends Component {
    static contextType = UserContext;
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
            this.setState({ users: response.data });
        });
        const current_user = this.context;
        if (current_user.role === "ADMIN" || current_user.role === "TEACHER") {
            GroupService.getGroups().then((response) => {
                const res = response.data
                this.setState({ classes: ["", ...res ] })
            });
        }
    }


    GetRecieverHandler = (event) => {
        this.setState({to: event.target.value});
    };

    changeClassNameHandler = (event) => {
        this.setState({ className: event.target.value });
    };

    saveMessage = (e) => {
        e.preventDefault();
        const to = this.state.to.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
        let message = JSON.stringify({
            to: to,
            subject: this.state.subject,
            content: this.state.content,
        });

        SendMessageService.SendMessage(message).then((response) => {
            if (response.data != null) {
                toast.success(t('success_sending_message'), {
                    position: toast.POSITION.TOP_CENTER,
                });
            }else {
                toast.error(t("error_sending_message"), {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        })
            .catch((error) => {
                toast.error(t("error_sending_message"), {
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
                toast.success(t('success_sending_message_to_all'), {
                    position: toast.POSITION.TOP_CENTER,
                });
            }else {
                toast.error(t("error_sending_message"), {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        })
            .catch((error) => {
                toast.error(t("error_sending_message"), {
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
                toast.success(t('success_sending_message'), {
                    position: toast.POSITION.TOP_CENTER,
                });
            }else {
                toast.error(t("error_sending_message"), {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        })
            .catch((error) => {
                toast.error(t("error_sending_message"), {
                    position: toast.POSITION.TOP_CENTER,
                });
            });
    };


    render() {
        const { t } = i18next;
        const { to, users } = this.state;
        const current_user = this.context;
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
                <h2 className="mb-3">{t('create_a_message')}</h2>
                <form onSubmit={(e) =>{
                    this.saveMessage(e);

                } }>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                            <div>
                                {t('to')}
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
                                            names[names.length-1] = user.name + ' ' + user.lastName + ' ' + '(' + user.email + ')' + ',';
                                            this.setState({ to: names.join(',') });
                                        }}
                                    >
                                        <div key={user.id} title={user.email}>
                                            {user.name + ' ' + user.lastName + ' ' + '(' + user.email + ')'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            {t('topic')}
                        </label>
                        <input className="form-control" type="PrettyPrintJson" id="" value={this.state.subject}
                               onChange={this.changeNameHandler}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            {t('contents')}
                        </label>
                        <div className="q1-editor"><ReactQuill value={this.state.content} onChange={this.changeDescriptionHandler} /></div>
                    </div>
                    <div className="form-but">

                        <button className="group-buttons">{t('send')}</button>
                        {(current_user.role === "ADMIN") &&  <button className="group-buttons" onClick={(e) =>{
                            this.saveMessage2(e);
                        } }>{t('send_to_all_users')}</button>}

                        <div className="form-but">
                        {(current_user.role === "ADMIN" || current_user.role === "TEACHER")  &&  <div className="form-but">
                            <button className="group-buttons" onClick={(e) =>{
                                this.saveMessage3(e);
                            }}>{t('send_to_group')}</button>
                            <select value={this.state.className} onChange={this.changeClassNameHandler}>
                                {this.state.classes.map((aClass) => (
                                    <option key={aClass.id} value={aClass.id}> {aClass.name}</option>
                                ))}
                            </select>
                        </div>}

                        </div>

                    </div>

                </form>


            </div>
        );
    }
}

export default withTranslation()(SendMessage);
