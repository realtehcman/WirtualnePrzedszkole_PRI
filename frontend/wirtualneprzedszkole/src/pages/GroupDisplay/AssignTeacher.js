import "./AssignTeacher.scss"
import UserService from "../User/UserService"
import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";

const AssignTeacher = (props) => {
  const {t} = useTranslation();

    const [teachers, setTeachers] = useState([
        {

        }
    ])

    let {id} = props.value

    useEffect(() => {
        getTeachers().then(r => console.log(r));
    },[])


    const getTeachers = async() => {
        UserService.getTeachers().then((response) => {
            setTeachers(response.data)
        })
    }

    const navigate = useNavigate();
    const assignToClass = async(teacher) => {
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
                <td>{t('name')}</td>
                <td>{t('last_name')}</td>
                <td>{t('email')}</td>
                <td>{t('assign')}</td>
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
                      {t('assign')}
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
