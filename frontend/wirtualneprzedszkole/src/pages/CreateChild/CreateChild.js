import React, { Component } from 'react'

import ChildrenService from '../Children/ChildrenService'
import "../CreateUser/CreateUser.scss"
import { Link } from 'react-router-dom'


class CreateChild extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            lastName: "",
            classId: ""
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeClassIdHandler = this.changeClassIdHandler.bind(this);
        this.saveChild = this.saveChild.bind(this);
    }

    saveChild = (e) => {
        e.preventDefault();
        let child = JSON.stringify({name: this.state.name, lastName: this.state.lastName, classId: this.state.classId});
        //user = JSON.stringify(user)
        

        ChildrenService.addChild(child).then(response => {
            if(response.data != null) {
                this.setState(this.state);
            }
        })
    }


    changeNameHandler = (event) => {
        this.setState({name: event.target.value})
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value})
    }

    changeClassIdHandler = (event) => {
        this.setState({classId: event.target.value})
    }



    render() {
        return (

                <div className='formContainer'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <div className='form-body'>
                                <form onSubmit = {this.saveChild}>
                                    <div className='form-group'>
                                        <input placeholder='Imię' name="Imię" className='"form-control' 
                                        value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Nazwisko' name="Nazwisko" className='"form-control' 
                                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <input placeholder='Id grupy' name="Id grupy" className='"form-control'
                                        value={this.state.classId} onChange={this.changeClassIdHandler}/>
                                    </div>
                                    <div className="form-but">
                                        <Link className="button3" to={"/children"}>Wróć</Link>

                                        <button className="button2">Zapisz</button>

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

        )
    }
}


export default CreateChild