import React, { useState, useEffect } from "react"
import { requestAllUsers, requestDeleteUser, requestUserBan } from "../services/userService"
import Table from 'react-bootstrap/Table'
import { Button } from "react-bootstrap"
import '../styles/DashboardAdmin.css'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';

const DashboardAdmin = () => {
    const [gotUsers, setGotUsers] = useState(false)
    const [users, setUsers] = useState([])

    const getUserInfo = async () => {
        setGotUsers(true)
        const requestedUsers  = await requestAllUsers()
        setUsers(requestedUsers)
    }
    useEffect(() => {
        if (!gotUsers) { getUserInfo() }
    })

    const handleBanClick = async (event) => {
        const email = event.target.id
        console.log('Changing user ban state')
        const banUser = await requestUserBan(email)
        setGotUsers(false)
    }

    const handleDeleteClick = async (event) => {
        const email = event.target.id
        console.log('Deleting user:', email)
        const deletedUser = await requestDeleteUser(email);
        setGotUsers(false)
    }
    return (
    <div>
        <h3>Users</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Ban</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.email}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td><Button id={user.email} className="banButton" variant="warning" onClick={handleBanClick}>{ user.isBanned ? 'ON' : 'OFF' }</Button></td>
                        <td><Button id={user.email} className="deleteButton" variant="danger" onClick={handleDeleteClick}>Delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <div>
        <Link to="/AdminCreateUser">
            <button type="button">
                Create User
            </button>
         </Link>
         <Link to="/AdminCreateAttendant">
            <button type="button">
                Create Attendant
            </button>
         </Link>
        </div>
    </div>
    )
}

export default DashboardAdmin
