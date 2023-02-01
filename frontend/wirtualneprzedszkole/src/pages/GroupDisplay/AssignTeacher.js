import "./AssignTeacher.scss"
import UserService from "../User/UserService"
import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from "react-router-dom";

const AssignTeacher = (props) => {

    const [teachers, setTeachers] = useState([
        {

        }
    ])

    let {id} = props.value

    useEffect(() => {
        getTeachers()
    },[])


    const getTeachers = async() => {
        UserService.getTeachers().then((response) => {
            setTeachers(response.data)
        })
    }

    const navigate = useNavigate();
    const assignToClass = async(teacher) => {
        console.log(teacher)
        UserService.assignTeacherToClass(id, teacher).then((response) => {
            console.log(response.data)
            navigate(`/group/${id}`);
        })
    }
    //console.log(id)

    return (
        <div className="scrollable-div">
          <table className="content-table">
            <thead>
              <tr className="table-head">
                <td>Imię</td>
                <td>Nazwisko</td>
                <td>Email</td>
                <td>Przypisz</td>
              </tr>
            </thead>
            <tbody className="body table-body">
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.lastName}</td>
                  <td>{teacher.email}</td>
                  <td>
                      <button
                      onClick={() => assignToClass(teacher)}
                      className="btn btn-danger"
                    >
                      Przypisz
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default AssignTeacher