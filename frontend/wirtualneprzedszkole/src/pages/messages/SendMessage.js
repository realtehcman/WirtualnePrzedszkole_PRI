import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import MessageService from "./MessageService";
import Popup from "../GroupDisplay/Popup";
import "../GroupDisplay/Popup.css"
import "../User/Table.scss";
import UserService from "../User/UserService";
import SendMessageService from "./SendMessageService";
import React, { Component } from "react";
import GroupService from "../GroupDisplay/GroupService";
import "../CreateUser/CreateUser.scss";
import { Link } from "react-router-dom";


class SendMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            to: "",
            subject: "",
            content: "",

        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.GetRecieverHandler = this.GetRecieverHandler.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.saveMessage2 = this.saveMessage2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    saveMessage = (e) => {
        e.preventDefault();
        let message = JSON.stringify({
            to: [this.state.to],
            subject: this.state.subject,
            content: this.state.content,

        });

        SendMessageService.SendMessage(message).then((response) => {
            if (response.data != null) {
                this.setState(this.state);
            }
        });
    };

    changeNameHandler = (event) => {
        this.setState({subject: event.target.value});
    };

    changeDescriptionHandler = (event) => {
        this.setState({content: event.target.value});
    };
    GetRecieverHandler = (event) => {
        this.setState({ to: event.target.value });
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
    handleSubmit(e) {
        alert('Wiadomość została wysłana : ' + '\n' + " Do : " + this.state.to + '\n' + " Temat : " + this.state.subject);
        e.preventDefault();
    }
    handleSubmit2(e) {
        alert('Wiadomość została wysłana do wszystkich rodziców ' + '\n' + " Temat : " + this.state.subject);
        e.preventDefault();
    }

    render() {
        return (
            <div className="container mt-5">
                <h2 className="mb-3">Utwórz wiadomość</h2>
                <form onSubmit={(e) =>{
                    this.saveMessage(e);
                    this.handleSubmit(e);
                } }>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                            Do :
                        </label>

                        <input className="form-control" type="PrettyPrintJson" id="name" required value={this.state.to}
                               onChange={this.GetRecieverHandler} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            Temat
                        </label>
                        <input className="form-control" type="PrettyPrintJson" id="" required value={this.state.subject}
                               onChange={this.changeNameHandler} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" >
                            Treść
                        </label>
                        <textarea className="form-control" type="PrettyPrintJson" required value={this.state.content}
                                  onChange={this.changeDescriptionHandler} />
                    </div>
                    <div className="form-but">

                        <button className="button">Wyślij</button>
                        <button className="button" onClick={(e) =>{
                            this.saveMessage2(e);
                            this.handleSubmit2(e);
                        } }>Wyślij do wszystkich rodziców</button>
                    </div>

                </form>


            </div>
        );
    }
}
export default SendMessage