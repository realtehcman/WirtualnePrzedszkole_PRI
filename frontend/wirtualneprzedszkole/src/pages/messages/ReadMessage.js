import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import messageService from "./MessageService";
import "../User/Table.scss";
import { useTranslation } from "react-i18next";

const ReadMessage = () => {
    const { t } = useTranslation();
    const [message, setMessage] = useState({
        id: "",
        author: "",
        subject: "",
        content: "",
    });

    let {id} = useParams();

    useEffect(() => {
        const getData = async () => {
        messageService.getMessage(id).then((response) => {
            let msgData = response.data;

            setMessage({
                id: msgData.id,
                author: msgData.author,
                subject: msgData.subject,
                content: msgData.content,
            });
        });
    };
        getData().then(r => console.log(r));
     // eslint-disable-next-line
    }, []);



    return (


        <div>

       <table className="table table-responsive">
                    <thead>
                    <tr className="table-head">
                        <td className="text-center">{t('contents')}</td>
                    </tr>
                    </thead>
                    <tbody className="body">
                        <tr>
                            {/*<td class="text-center">{message.content}</td>*/}
                            {/*Idk czy to zostawic ponieważ może to być niby ryzykowane jak się stosuje dangerouslySetInnerHTML cza o tym troche poczytać */}
                            <td className="" dangerouslySetInnerHTML={{__html: message.content}}/>
                        </tr>

                </tbody>
            </table>

        </div>
    );

}
export default ReadMessage
