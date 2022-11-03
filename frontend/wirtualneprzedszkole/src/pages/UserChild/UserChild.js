import React, { useEffect, useState } from "react";
import UserService from "../User/UserService";
import ChildrenService from "../Children/ChildrenService";
import { useParams, useNavigate } from "react-router-dom";
import "../User/Table.scss";

const UserChild = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [children, setChild] = useState([
    {
      id: "",
      name: "",
      lastName: "",
    //   add another field in the backend (parents amount)
    },
  ]);


//   request to the database
  const getData = async () => {
    ChildrenService.getChildren().then((response) => {
      console.log("Response from main API: ", response);
      let ChildData = response.data;
      let childrenData = ChildData.map((it) => {
        return { id: it.id, name: it.name, lastName: it.lastName };
      });
      setChild(childrenData);
    });
  };


  useEffect(() => {
    getData();
  }, []);

  const putUser = async (id, child) => {
    console.log(id);
    console.log(child);
    UserService.addChildToUser(id, child);
  };

  const onClick = (id, child) => {
    putUser(id, child);
    navigate("/user/" + id, { replace: true });
  };


  return (
    <div>
      <table className="content-table">
        <thead>
          <tr className="table-head">
            <td>Imię</td>
            <td>Nazwisko</td>
            <td>Akcje</td>
          </tr>
        </thead>
        <tbody className="body">
          {children.map((child) => (
            // child.filter(i=> ) sorting parents amount (if >2 return null)
            <tr key={child.id}>
              <td>{child.name}</td>
              <td>{child.lastName}</td>
              <td>
                <button
                  onClick={() => onClick(id, child)}
                  className="btn btn-danger"
                >
                  Przypisz Dziecko
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserChild;
