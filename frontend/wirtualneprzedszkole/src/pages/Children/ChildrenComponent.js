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
      {props.t('look')}
    </button>
  );
};

const Navi2 = (props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/EditChild/" + props.value)}
      className="btn btn-info mx-2"
    >
      {props.t('edit')}
    </button>
  );
};

class ChildrenComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      searchTerm: "",
      inputHeight: 0
    };
    this.myDiv = React.createRef();
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
    if (window.confirm(`Czy na pewno chcesz usunąć użytkownika: ${childName} ${childlastName}  ?`)) {
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
    this.setState({inputHeight: this.myDiv.current.offsetHeight})
    ChildrenService.getChildren().then((response) => {
      this.setState({ children: response.data });
      this.loger();
    });
  }

  render() {
    const {t} = this.props;

    let filteredchildren = this.state.children.filter((child) =>
      child.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
      child.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
      (child.classId && child.classId.toString().includes(this.state.searchTerm.toLowerCase())) ||
      (child.name.toLowerCase() + " " + child.lastName.toLowerCase()).includes(this.state.searchTerm.toLowerCase())
    );


    return (
      <div data-testid="children-component" className="h-100">  <ToastContainer position="top-center" />
        <div ref={this.myDiv} className="pb-4">
          <input type="text" className="form-control border-0" placeholder={t('search')} onChange={this.handleSearch} />
        </div>

        <div className="scrollable-div maxArea" style={{height: `calc(100% - ${this.state.inputHeight}px)`}}>
          <table className="content-table w-100">
            <thead>
              <tr className="table-head">
                <td>{t('id')}</td>
                <td>{t('name')}</td>
                <td>{t('last_name')}</td>
                <td>{t('group')}</td>
                <td>{t('actions')}</td>
              </tr>
            </thead>
            <tbody className="body">
              {filteredchildren.map((child) => (
                <tr key={child.id}>
                  <td>{child.id}</td>
                  <td>{child.name}</td>
                  <td>{child.lastName}</td>
                  <td id="td--children">{child.classId}</td>
                  <td>
                    <Navi value={child.id} t={t} />

                    <Navi2 value={child.id} t={t} />

                    <button
                      onClick={() => this.deleteChild(child.id)}
                      className="btn btn-danger">
                      {t('delete')}
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
