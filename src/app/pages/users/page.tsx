'use client'

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { fetchUser } from "@/app/redux/slice/userSlice";
import { ApiResponse } from "@/app/redux/types/apiTypes";

const Users: React.FC = () => {

    const dispatch=useDispatch()
    const {data,loading,error}=useSelector((state:RootState)=>state.user)

    useEffect(()=>{
         dispatch(fetchUser())
    },[dispatch])

    if(loading){
        return <h2>Loading....</h2>
    }
    if(error){
        return <h3>Error: {error}</h3>
    }

    const Users=data?.users || []

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>D.O.B</th>
                        <th>Phone</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                            Users.map((user,index)=>(
                                <tr key={index}>
                                    <td> {user.id} </td>
                                    <td> {user.firstName} </td>
                                    <td> {user.age} </td>
                                    <td> {user.gender} </td>
                                    <td> {user.email} </td>
                                    <td> {user.birthDate} </td>
                                    <td> {user.phone} </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users; 