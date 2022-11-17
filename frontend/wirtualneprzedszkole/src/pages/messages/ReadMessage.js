// import React, { useEffect, useState }from 'react'
// import MessageService from './MessageService'
// import {useParams, useNavigate} from "react-router-dom";
// import "../User/Table.scss"
// import MessageService from "./MessageService";
//
//
// const ReadMessage = () => {
//     const navigate = useNavigate()
//     const [msg, setMsg] = useState({
//         id: '',
//         author: '',
//         subject: '',
//         content: '',
//     }
//
//     let {id} = useParams()
//
//     useEffect(() => {
//         getData()
//     },[])
//
//
//
//
//     const getData = async () => {
//
//         ChildrenService.getChild(id).then(response => {
//             console.log('Response from main API: ',response)
//             let ChildData = response.data;
//             let parents = ChildData.parents.map(it => {return {id: it.id, name: it.name, lastName: it.lastName, email: it.email}})
//             setChild({id: ChildData.id, name: ChildData.name, lastName: ChildData.lastName, parents:  parents})
//         });
//
//     }
//
//     return (
//         <div>
//             <h1>Rodzice: {child.name}  {child.lastName}</h1>
//             <table className='content-table'>
//                 <thead>
//
//                 <tr className='table-head'>
//
//                     <td>Imię</td>
//                     <td>Nazwisko</td>
//                     <td>Email</td>
//                     <td>Akcje</td>
//                 </tr>
//                 </thead>
//                 <tbody className='body'>
//                 {
//                     child.parents.map(
//                         parent =>
//                             <tr key = {parent.id}>
//                                 <td>{parent.name}</td>
//                                 <td>{parent.lastName}</td>
//                                 <td>{parent.email}</td>
//                                 <td>
//                                     <button onClick={() => navigate("/user/" + parent.id, { replace: true })} className='btn btn-info'>Zobacz</button>
//                                 </td>
//                             </tr>
//                     )
//                 }
//                 </tbody>
//             </table>
//
//         </div>
//     )
// }
//
// export default ReadMessage