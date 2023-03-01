import React, {useEffect, useState} from 'react'
import ChildrenService from './ChildrenService'
import {useNavigate, useParams} from "react-router-dom";
import "../User/Table.scss"
import { useTranslation } from "react-i18next";

const Child = () => {
    const navigate = useNavigate()
    const {t} = useTranslation();

    const [child, setChild] = useState({
        id:'',
        name: '',
        lastName:'',
        email: '',
        parents: [{
            id: '',
            name: '',
            lastName: '',
            email: ''
        }]
    });
    let {id} = useParams()

    useEffect(() => {
        const getData = async () => {
            ChildrenService.getChild(id).then(response => {
                let ChildData = response.data;
                let parents = ChildData.parents.map(it => {return {id: it.id, name: it.name, lastName: it.lastName, email: it.email}})
                setChild({id: ChildData.id, name: ChildData.name, lastName: ChildData.lastName, parents:  parents})
            });
        }
        getData().then(() => console.log('Data is loaded'))
    },[id])



    return (
        <div data-testid="child">
            <h1>{t('parents')}: {child.name} {child.lastName}</h1>
            <div className='table-container'>
                <table className='content-table'>
                    <thead>

                    <tr className='table-head'>

                        <td>{t('name')}</td>
                        <td>{t('last_name')}</td>
                        <td>{t('email')}</td>
                        <td>{t('actions')}</td>
                    </tr>
                    </thead>
                    <tbody className='body table-body'>
                    {
                        child.parents.map(
                            parent =>
                                <tr key = {parent.id}>
                                    <td id="td--child">{parent.name}</td>
                                    <td id="td--child">{parent.lastName}</td>
                                    <td id="td--child">{parent.email}</td>
                                    <td id="td--child">

                                        <button onClick={() => navigate("/user/" + parent.id)} className='btn btn-info'>{t('look')}</button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Child
