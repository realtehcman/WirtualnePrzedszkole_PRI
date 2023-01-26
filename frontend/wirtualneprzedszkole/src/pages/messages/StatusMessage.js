import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import messageService from "./MessageService";
import "../User/Table.scss";

const StatusMsg = () => {
    const [message, setMessage] = useState({
        id: "",
        author: "",
        to: [
            {name: ""},
            { lastName: ""},
            {email: ""},
            { isRead: ""}
        ]
    });
    let { id } = useParams();
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        messageService.getSentMessage(id).then((response) => {
            console.log("Response from main API: ", response);
            let msgData = response.data;

            setMessage({
                id: msgData.id,
                author: msgData.author,
                subject: msgData.subject,
                content: msgData.content,
                to: msgData.to,

            });
        });
    };

    return (
        <div className="scrollable-div">
            <table className="content-table">
                <thead>
                <tr className="table-head">
                    <td>Imie</td>
                    <td>Nazwisko</td>
                    <td>email</td>
                    <td>Status</td>

                </tr>
                </thead>
                <tbody>
                {message.to.map((aaa) => (
                    <tr key={aaa.name} style={aaa.isRead ? {backgroundColor:'#90ee90 '} : {backgroundColor:'#FF6666'}}>
                        <td>{aaa.name}</td>
                        <td>{aaa.lastName}</td>
                        <td>{aaa.email}</td>
                        <td>{aaa.isRead ? "wyświetlone" : "nie wyświetlone"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>


    );
}
export default StatusMsg;