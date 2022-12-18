import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import messageService from "./MessageService";
import "../User/Table.scss";

const ViewMsg = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({
        id: "",
        author: "",
        subject: "",
        content: "",
    });

    let { id } = useParams();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        // const response = UserService.getUser(id)
        // setUser((await response).data)
        messageService.ViewMessage(id).then((response) => {
            console.log("Response from main API: ", response);
            let msgData = response.data;

            setMessage({
                id: msgData.id,
                author: msgData.author,
                subject: msgData.subject,
                content: msgData.content,
            });
        });
    };

    return (


        <div >

            <table class="table table-responsive">
                <thead>
                <tr className="table-head">
                    <td class="text-center">Treść</td>
                </tr>
                </thead>
                <tbody className="body">
                <tr>
                    <td class="text-center">{message.content}</td>
                </tr>

                </tbody>
            </table>

        </div>
    );

}
export default ViewMsg