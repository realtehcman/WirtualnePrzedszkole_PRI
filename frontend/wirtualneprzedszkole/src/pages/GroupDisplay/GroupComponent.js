import React from 'react';
import GroupService from './GroupService';
import "./GroupDisplay.scss"
import { useNavigate } from "react-router-dom";

const Navi = (props) => {
    const navigate = useNavigate()
    return(
        <button onClick={() => navigate("/group/" + props.value, { replace: true })} className='btn btn-info'>Zobacz</button>
    )
}


class GroupComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            groups:[]
        }
        this.deleteGroup = this.deleteGroup.bind(this);
    }
    deleteGroup(id) {
        GroupService.deleteGroup(id).then(response => {
            this.setState({groups: this.state.groups.filter(group => group.id !== id)});
        });
    }

    componentDidMount(){
        GroupService.getGroups().then((response) => {
            this.setState({groups: response.data})
        });
    }

    render (){
        return(
            <div className="scrollable-div">

            <div>
                <table className='content-table'>
                    <thead>
                    <tr className='table-head'>

                        <td>Id</td>
                        <td>Nazwa</td>
                        <td>Opis</td>
                        <td></td>
                        <td>Akcje</td>
                    </tr>
                    </thead>
                    <tbody className='body'>
                    {
                        this.state.groups.map(
                            group =>
                                <tr key = {group.id}>
                                    <td>{group.id}</td>
                                    <td>{group.name}</td>
                                    <td>{group.description}</td>
                                    <td></td>
                                    <td>

                                        <Navi value={group.id}/>
                                        <button onClick={() => this.deleteGroup(group.id)} className='btn btn-danger'>Usuń</button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

            </div></div>
        )

    }

}

export default GroupComponent