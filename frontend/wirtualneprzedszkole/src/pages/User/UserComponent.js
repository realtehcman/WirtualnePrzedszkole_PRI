import React from 'react';
import UserService from './UserService';
import "./Table.scss"


class UserComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({users: response.data})
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
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody className='body'>
                        {
                            this.state.users.map(
                                user =>
                                <tr key = {user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        )
    }

}

export default UserComponent