import React from "react";
import ChildrenService from "./ChildrenService";
import "../User/Table.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navi = (props) => {
  const navigate = useNavigate();
  return (
      <button
          onClick={() => navigate("/child/" + props.value)}
          className="btn btn-info"
      >
        Zobacz
      </button>
  );
};

const Navi2 = (props) => {
  const navigate = useNavigate();
  return (
      <button
          onClick={() => navigate("/EditChild/" + props.value)}
          className="btn btn-info"
      >
        edytuj
      </button>
  );
};

class ChildrenComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      searchTerm: "",
    };
    this.deleteChild = this.deleteChild.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }
  handleSearch(e) {
    this.setState({ searchTerm: e.target.value });
  }

  loger() {
    console.log(this.state);
  }


  deleteChild(id) {
    let childName = this.state.children.find(child => child.id === id).name;
    let childlastName = this.state.children.find(child => child.id === id).lastName;
    if(window.confirm(`Czy na pewno chcesz usunąć użytkownika: ${childName} ${childlastName}  ?`)) {
      ChildrenService.deleteChild(id).then((response) => {
        this.setState({
          children: this.state.children.filter((child) => child.id !== id),
        });
        toast.success("Pomyślnie usunięto dziecko " + childName + " " + childlastName);
      }).catch(() => {
        toast.error("Wystąpił błąd podczas usuwania dziecka " + childName + " " + childlastName);
      });
    }
  }



  componentDidMount() {
    ChildrenService.getChildren().then((response) => {
      this.setState({ children: response.data });
      this.loger();
    });
  }

  render() {
    let filteredchildren = this.state.children.filter((child) =>
        child.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        child.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        (child.classId && child.classId.toString().includes(this.state.searchTerm.toLowerCase())) ||
        (child.name.toLowerCase() + " " + child.lastName.toLowerCase()).includes(this.state.searchTerm.toLowerCase())
    );


    return (
        <div data-testid="children-component" className="scrollable-div1">

          <div className="abc">
            <input
                type="text"
                placeholder="Wyszukaj.."
                onChange={this.handleSearch}
            />

          </div>
          <div className="table-container">
          <ToastContainer position="top-center" />

          <table className="content-table">
            <thead>
            <tr className="table-head">

              <td>Imię</td>
              <td>Nazwisko</td>
              <td>Grupa</td>
              <td>Akcje</td>
            </tr>
            </thead>
            <tbody className="body">
            {filteredchildren.map((child) =>(
                <tr key={child.id}>

                  <td id="td--children">{child.name}</td>
                  <td id="td--children">{child.lastName}</td>
                  <td id="td--children">{child.className}</td>
                  <td id="td--children">
                    <Navi value={child.id} />



                    <Navi2 value={child.id} />

                    <button
                        onClick={() => this.deleteChild(child.id)}
                        className="btn btn-danger"
                    >
                      Usuń
                    </button>



                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        </div>
    );
  }
}

export default ChildrenComponent;
