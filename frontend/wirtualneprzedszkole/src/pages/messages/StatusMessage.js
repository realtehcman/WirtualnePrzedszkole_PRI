import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import messageService from "./MessageService";
import "../User/Table.scss";
import { useTranslation } from "react-i18next";

const StatusMsg = () => {
    const { t } = useTranslation();
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
    const [error, setError] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            messageService.getSentMessage(id).then((response) => {
                console.log(response.status);
                if (response.status === 403) {
                    setError(true);
                } else {
                    let msgData = response.data;
                    setMessage({
                        id: msgData.id,
                        author: msgData.author,
                        subject: msgData.subject,
                        content: msgData.content,
                        to: msgData.to,
                    });
                }
            });
        };
        getData();
        // eslint-disable-next-line
    }, [id]);

    if (error) {
        window.location.href = '/Message';
        return null;
    }

    return (
        <div data-testid="status-message-navi" className="scrollable-div">
            <table data-testid="status-message" className="content-table">
                <thead>
                <tr className="table-head">
                    <td>{t('name')}</td>
                    <td>{t('last_name')}</td>
                    <td>{t('email')}</td>
                    <td>{t('status')}</td>

                </tr>
                </thead>
                <tbody>
                {message.to.map((aaa) => (
                    <tr key={aaa.name} style={aaa.isRead ? {backgroundColor:'#90ee90 '} : {backgroundColor:'#FF6666'}}>
                        <td>{aaa.name}</td>
                        <td>{aaa.lastName}</td>
                        <td>{aaa.email}</td>
                        <td>{aaa.isRead ? `${t('displayed')}` : `${t('not_displayed')}`}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatusMsg;
