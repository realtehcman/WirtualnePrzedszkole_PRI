import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import messageService from "./MessageService";
import "../User/Table.scss";
import { useTranslation } from "react-i18next";

const ViewMessage = () => {
    const { t } = useTranslation();
    const [message, setMessage] = useState({
        id: "",
        author: "",
        subject: "",
        content: "",
    });
    const [isForbidden, setIsForbidden] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            messageService.ViewMessage(id).then((response) => {
                if (response.status === 403) {
                    setIsForbidden(true);
                } else {
                    let msgData = response.data;
                    setMessage({
                        id: msgData.id,
                        author: msgData.author,
                        subject: msgData.subject,
                        content: msgData.content,
                    });
                }
            }).catch(() => setIsForbidden(true));
        }
        getData();
        // eslint-disable-next-line
    }, [id]);

    if (isForbidden) {
        window.location.replace('/Message');
        return null;
    }

    return (
        <div data-testid="view-message" >
            <table className="table table-responsive">
                <thead>
                <tr className="table-head">
                    <td className="text-center">{t('contents')}</td>
                </tr>
                </thead>
                <tbody className="body">
                <tr>
                    <td className="" dangerouslySetInnerHTML={{__html: message.content}}/>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
export default ViewMessage;
