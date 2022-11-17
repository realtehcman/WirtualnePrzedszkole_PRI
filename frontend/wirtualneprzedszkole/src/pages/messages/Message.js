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
import messageService from "./MessageService";


const Navi = (props) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/ReadMessage/" + props.value, { replace: true })}
            className="btn btn-info"
        >
            Zobacz
        </button>
    );
};

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            received_messages: [],
        };
        this.deleteReceivedMessages = this.deleteReceivedMessages.bind(this);
    }

    loger() {
        console.log(this.state);
    }

    deleteReceivedMessages(id) {
        MessageService.deleteReceivedMessages(id).then((response) => {
            this.setState({
                received_messages: this.state.received_messages.filter((received_messages) => received_messages.id !== id),
            });
        });
    }

    componentDidMount() {
        MessageService.getReceivedMessages().then((response) => {
            this.setState({ received_messages: response.data });
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
                        <td>Od:</td>
                        <td>Temat:</td>
                        <td>Treść</td>
                        <td>Akcje</td>
                    </tr>
                    </thead>
                    <tbody className="body table-body">
                    {this.state.received_messages.map((received_messages) => (
                        <tr key={received_messages.id}>
                            <td>{received_messages.id}</td>
                            <td>{received_messages.author}</td>
                            <td>{received_messages.subject}</td>
                            <td>{received_messages.content}</td>
                            <td className="foobar">
                                {/* <button onClick={() => this.props.navigation.navigate("/home//")} className='btn btn-info'>Zobacz</button> */}
                                {/*
                                Read more -> read msg
                                <Navi value={received_messages.id} />*/}
                                <button
                                    onClick={() => this.deleteReceivedMessages(received_messages.id)}
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
export default Message