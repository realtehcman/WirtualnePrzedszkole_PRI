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
      parents: [],
    },
  ]);

  //   request to the database
  const getData = async () => {
    ChildrenService.getChildren().then((response) => {
      console.log("Response from main API: ", response);
      let ChildData = response.data;
      let childrenData = ChildData.map((it) => {
        return {
          id: it.id,
          name: it.name,
          lastName: it.lastName,
          parents: it.parents,
        };
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
    UserService.addChildToUser(id, child).then((response) => {
      if (response.status !== 200) throw new Error(response.status);
      else {
        navigate("/user/" + id, { replace: true });
      }
    });
  };

  /* const onClick = (id, child) => {
    const response = putUser(id, child)
    if (response.status !== 200) throw new Error(response.status);
    else {
      navigate("/user/" + id, { replace: true });
    }
  }; */

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
            /* if (child.parents.length < 2) {
              return ( */
                <tr key={child.id}>
                  <td>{child.name}</td>
                  <td>{child.lastName}</td>
                  <td>
                    <button
                      onClick={() => putUser(id, child)}
                      className="btn btn-danger"
                    >
                      Przypisz Dziecko
                    </button>
                  </td>
                </tr>
            /*   );
            } else {
              return null;
            } */
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserChild;
