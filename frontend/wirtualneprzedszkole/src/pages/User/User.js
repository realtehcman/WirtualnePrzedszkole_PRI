import React, { useEffect, useState } from "react";
import UserService from "../User/UserService";
import "./UserInfo.scss";
import { useParams, useNavigate } from "react-router-dom";
import FileService from "../gallery/FileService"
import { useTranslation } from "react-i18next";

const User = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    role: "",
    opis: "",
    children: [
      {
        id: "",
        name: "",
        classId: "",
      },
    ],
  });

  const [userAvatar, setUserAvatar] = useState()
  let { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      // const response = UserService.getUser(id)
      // setUser((await response).data)
      UserService.getUser(id).then((response) => {
        console.log("Response from main API: ", response);
        let userData = response.data;
        let children = userData.children.map((it) => {
          return { id: it.id, name: it.name, lastName: it.lastName, classId: it.classId };
        });
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          lastName: userData.lastName,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          role: userData.role,
          opis: userData.opis,
          children: children,
        });

        if (userData.picture !== undefined) {
          FileService.getFile(-1, userData.picture).then(response => {
            let urlCreator = window.URL || window.webkitURL;
            setUserAvatar(urlCreator.createObjectURL(response.data))
          })
        } else {
          setUserAvatar("https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif")
        }
      });

    }
    getData();
    // eslint-disable-next-line
  }, []);


  const deleteAvatar = async (deletePictureUser) => {
    UserService.deleteAvatar(deletePictureUser).then(response => {
      if (response.status !== 200) throw new Error(response.status);
      else {
        setUserAvatar("https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif")
      }
    })
  }


  return (
    <>
      <div className="App_card">
        <h1>{t('information')}</h1>
      </div>

      <div className="row">
        <div className="col-xl-4 col-md-6 col-12">
          <div className="App_card">
            <div>
              <div className="img-container text-center mb-4">
                <img src={userAvatar} alt="zdjęcie profilowe" className="rounded-circle user_img"
                /* src="https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif" */
                />
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-12">
                  <label className="text-capitalize fw-bold">{t('user_name')}:</label>
                </div>
                <div className="col-md-6 col-12">
                  <p className="mb-0 text_wrap">{user.name}</p>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-12">
                  <label className="text-capitalize fw-bold">{t('user_last_name')}:</label>
                </div>
                <div className="col-md-6 col-12">
                  <p className="mb-0 text_wrap">{user.lastName}</p>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-12">
                  <label className="text-capitalize fw-bold">{t('user_email')}:</label>
                </div>
                <div className="col-md-6 col-12">
                  <p className="mb-0 text_wrap">{user.email}</p>
                </div>
              </div>


              <div className="d-flex justify-content-between align-items-center mt-4 gap10">
                <button
                  onClick={() =>
                    navigate("/user/" + user.id + "/edit", { replace: true })
                  }
                  className="btn btn_global"
                  type="button"
                >
                  {t('edit')}
                </button>
                <button className="btn btn-danger" onClick={() => deleteAvatar(user)}>{t('delete_profile')}</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-md-6 col-12">
          <div className="App_card">
            <div className='row mb-2'>
              <div className='col-md-2 col-12'>
                <label class="fw-bold">{t('telephone')}:</label>
              </div>
              <div className='col-md-10 col-12'>
                <p className="labels mb-0">{user.phoneNumber}</p>
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-md-2 col-12'>
                <label class="fw-bold">{t('address')}:</label>
              </div>
              <div className='col-md-10 col-12'>
                <p className="labels mb-0">{user.address}</p>
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-md-2 col-12'>
                <label class="fw-bold">{t('role')}:</label>
              </div>
              <div className='col-md-10 col-12'>
                <p className="labels mb-0">{user.role}</p>
              </div>
            </div>

            <div className='row mb-2'>
              <div className='col-md-2 col-12'>
                <label class="fw-bold">{t('about_me')}:</label>
              </div>
              <div className='col-md-10 col-12'>
                <p className="labels mb-0">{user.opis}</p>
              </div>
            </div>

            <div className="row mt-5 mb-3">
              <div className="col-12">
                <h1>{t('kids')}:</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <table className="children">
                  <thead>
                    <tr>
                      <th>{t('name')}</th>
                      <th>{t('last_name')}</th>
                      {/* <th>classId</th> */}
                      <th>{t('class_name')}</th>

                    </tr>
                  </thead>

                  <tbody>
                    {user.children.map((child) => (
                      <tr
                        key={child.id}
                        onClick={() =>
                          navigate("/child/" + child.id)
                        }
                      >
                        <td>{child.name}</td>
                        <td>{child.lastName}</td>
                        <td>{child.classId}</td>

                      </tr>
                      //<div className="col-md-12"><label className="labels">dzieci: </label>  <label className="labels">{child.name}</label></div>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12 text-center">
                <button
                  onClick={() =>
                    navigate("/user/" + user.id + "/child")
                  }
                  className="btn btn_global"
                  type="button"
                >
                  {t('add_child')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default User;
