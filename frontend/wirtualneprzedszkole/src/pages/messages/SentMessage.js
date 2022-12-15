import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import {useEffect, useState} from "react";
import MessageService from "./MessageService";
import Popup from "../GroupDisplay/Popup";
import "../GroupDisplay/Popup.css"
import "../User/Table.scss";
import UserService from "../User/UserService";
import SentMessageService from "./SentMessageService";

const Navi2 = (props) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/StatusMessage/" + props.value, { replace: true })}
            className="btn btn-info"
        >
            Status
        </button>

    );
};

const Navi = (props) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/ReadMessage/" + props.value, { replace: true })}
            className="btn btn-info"
        >
            Wyświetl
        </button>

    );
};

class SentMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sent_messages: [],
        };
        this.deleteSentMessages = this.deleteSentMessages.bind(this);
    }

    loger() {
        console.log(this.state);
    }

    deleteSentMessages(id) {
        SentMessageService.deleteSentMessages(id).then((response) => {
            this.setState({
                sent_messages: this.state.sent_messages.filter((sent_messages) => sent_messages.id !== id),
            });
        });
    }

    componentDidMount() {
        SentMessageService.getSentMessages().then((response) => {
            this.setState({ sent_messages: response.data });
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
                        <td>autor:</td>
                        <td>Temat:</td>
                        <td>Treść</td>
                        <td>Akcje</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.sent_messages.map((sent_messages) => (
                        <tr key={sent_messages.id}>
                            <td>{sent_messages.id}</td>
                            <td>{sent_messages.author}</td>
                            <td>{sent_messages.subject}</td>
                        <td><Navi value={sent_messages.id} />
                            <Navi2 value={sent_messages.id} />
                        </td>
                            <td className="foobar">
                                <button2
                                    onClick={() => this.deleteSentMessages(sent_messages.id)}
                                    className="btn btn-danger"
                                >
                                    Usuń
                                </button2>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        );
    }
}
export default SentMessage