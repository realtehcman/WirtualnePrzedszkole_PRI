import React, { useEffect, useState } from "react";
import UserService from "../User/UserService";
import "./UserInfo.scss";
import { useParams, useNavigate } from "react-router-dom";
import FileService from "../gallery/FileService"

const User = () => {
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


  const deleteAvatar = async(deletePictureUser) => {
    UserService.deleteAvatar(deletePictureUser).then(response => {
        if (response.status !== 200) throw new Error(response.status);
        else {
            setUserAvatar("https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif")
        }
    })
  }


  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img src= {userAvatar}
              alt="zdjęcie profilowe"
              className="rounded-circle mt-5"
              width="150px"
              /* src="https://media.tenor.com/N0aZdbie0N8AAAAM/cute-cute-cat.gif" */
            />
            <div className="dlt">            <button className="btn btn-danger" onClick={() => deleteAvatar(user)}>Usuń Profilowe</button>
            </div>
            <span className="font-weight-bold">
              {user.name} {user.lastName}
            </span>
            <span className="text-black-50">{user.email}</span>
            <span> </span>
          </div>
          <div className="mt-5 text-center">
            <button
              onClick={() =>
                navigate("/user/" + user.id + "/edit", { replace: true })
              }
              className="btn btn-primary profile-button"
              type="button"
            >
              Edytuj
            </button>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Informacje</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6"></div>
              <div className="col-md-6"></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Telefon: </label>{" "}
                <label className="labels">{user.phoneNumber}</label>
              </div>
              <div className="col-md-12">
                <label className="labels">Adres: </label>{" "}
                <label className="labels">{user.address}</label>
              </div>
              <div className="col-md-12">
                <label className="labels">Rola: </label>{" "}
                <label className="labels">{user.role}</label>
              </div>
              <div className="col-md-12">
                <label className="labels">O mnie : </label>
              </div>
              <div className="col-md-12">
                <label className="labels">{user.opis}</label>
              </div>

              {/* <div class="col-md-12"><label class="labels">Dziecko: </label>  <label class="labels">{user.children.map(item => {item.classId})}</label></div> */}
              <div className="col-md-12">
                <h1>Dzieci: </h1>
                <table className="children">
                  <thead>
                    <tr>
                      <th>Imię</th>
                      <th>nazwisko</th>
                      <th>classId</th>

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
                <div className="mt-5 text-center">
                  <button
                    onClick={() =>
                      navigate("/user/" + user.id + "/child")
                    }
                    className="btn btn-primary profile-button"
                    type="button"
                  >
                    Dodaj Dziecko
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
