import React, { useState } from 'react'
import UserService from '../User/UserService'
import "../Home/Home.scss"
import {useParams} from "react-router-dom";

const User = () => {
    let { id } = useParams()
    return(
        <h1>{id}</h1>
    )


    
}

export default User