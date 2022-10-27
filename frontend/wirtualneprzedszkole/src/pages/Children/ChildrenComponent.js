import React from 'react';
import ChildrenService from './ChildrenService';
import "../User/Table.scss"
import { useNavigate } from "react-router-dom";

const Navi = (props) => {
    const navigate = useNavigate()
    return(
        <button onClick={() => navigate("/child/" + props.value, { replace: true })} className='btn btn-info'>Zobacz</button>
    )
}


class ChildrenComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            children:[]
        }
    this.deleteChild = this.deleteChild.bind(this);
    }
    deleteChild(id) {
        ChildrenService.deleteChild(id).then(response => {
            this.setState({children: this.state.children.filter(child => child.id !== id)});
        });
    }

    componentDidMount(){
        ChildrenService.getChildren().then((response) => {
            this.setState({children: response.data})
        });
    }
    
    render (){
        return(
            <div>
                <table className='content-table'>
                    <thead>
                        <tr className='table-head'>

                            <td>Id</td>
                            <td>Imię</td>
                            <td>Nazwisko</td>
                            <td>Grupa</td>
                            <td>Akcje</td>
                        </tr>
                    </thead>
                    <tbody className='body'>
                        {
                            this.state.children.map(
                                child =>
                                <tr key = {child.id}>
                                    <td>{child.id}</td>
                                    <td>{child.name}</td>
                                    <td>{child.lastName}</td>
                                    <td>{child.classId}</td>
                                    <td>

                                        <Navi value={child.id}/>
                                        <button onClick={() => this.deleteChild(child.id)} className='btn btn-danger'>Usuń</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        )
    }

}

export default ChildrenComponent