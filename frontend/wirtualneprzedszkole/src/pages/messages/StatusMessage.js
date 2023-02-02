import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
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
        const getData = async () => {
        messageService.getSentMessage(id).then((response) => {
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
        getData();
    }, []);

    

    return (
        <div data-testid="status-message-navi" className="scrollable-div">
            <table data-testid="status-message" className="content-table">
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
