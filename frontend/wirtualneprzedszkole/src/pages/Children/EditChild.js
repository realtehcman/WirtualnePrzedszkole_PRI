import React, { useEffect, useState } from 'react'
import ChildrenService from "./ChildrenService";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditChild = () => {
    const [child, setChild] = useState({
        name: '',
        lastName: '',
        classId: []
    });
    const [childEdit, setChildEdit] = useState({
        name: '',
        lastName: '',
        classId: []
    });
    let { id } = useParams()
    useEffect(() => {
        const getData = async () => {
            ChildrenService.getChild(id).then(response => {
                console.log('Response from main API: ', response)
                let childData = response.data;
                setChild({
                    id: childData.id, name: childData.name, lastName: childData.lastName, classId: childData.classId
                })
                setChildEdit({
                    id: childData.id, name: childData.name, lastName: childData.lastName, classId: childData.classId
                })
            });
        }
        getData()
        // eslint-disable-next-line
    }, [])

    const updateData = async (e) => {
        e.preventDefault()
        childEdit.id = child.id
        if (childEdit.name === "") childEdit.name = child.name
        if (childEdit.lastName === "") childEdit.lastName = child.lastName
        if (childEdit.classId === "") childEdit.classId = child.classId

        ChildrenService.editChild(childEdit)
            .then(response => {
                if (response.status === 200) {
                    toast.success("Dane zostały poprawnie zedytowane", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setChildEdit({
                        name: '',
                        lastName: '',
                        classId: ''
                    });

                    // Timer wywal jak Ci się uda zrobic żeby się zedytowane dane wyswietlaly

                    setTimeout(() => {
                        window.location.reload();
                    }, 1800);
                }
            })
            .catch(error => {
                toast.error("Wystąpił błąd podczas edycji", {
                    position: toast.POSITION.TOP_CENTER
                });
            });
    }




    return (
        <div>
            <ToastContainer position="top-center" />
            <form>
                <div className="row">
                    <div className="col-md-6 col-12 mb-3">
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <label>Imię:</label>
                            </div>
                            <div className="col-md-9 col-12">
                                <input placeholder={child.name} className="form-control" onChange={(e) => setChildEdit({ ...childEdit, name: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 mb-3">
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <label>Nazwisko:</label>
                            </div>
                            <div className="col-md-9 col-12">
                                <input placeholder={child.lastName} className="form-control" onChange={(e) => setChildEdit({ ...childEdit, lastName: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-12 mb-3">
                        <div className="row">
                            <div className="col-md-3 col-12">
                                <label>Wybierz Klasę:</label>
                            </div>
                            <div className="col-md-9 col-12">
                                <select className='d-block form-select'>
                                    <option>option1</option>
                                    <option>option2</option>
                                    <option>option3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12 text-center mt-5'>
                    <button onClick={updateData} className='btn btn_global'>Zapisz</button>
                    </div>
                </div>

                {/* <label>id klasy:</label><br></br>
                <input placeholder={child.classId} onChange={(e) => setChildEdit({...childEdit, classId : e.target.value})}/><br></br> */}

                {/* <input placeholder={child.classId} onChange={(e) => setChildEdit({...childEdit, classId : e.target.value})}/><br></br> */}              
            </form>
        </div>
    );
}

export default EditChild;