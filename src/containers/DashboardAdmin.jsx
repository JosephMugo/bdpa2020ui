import React, { useState, useEffect } from "react"
import { requestAllUsers } from "../services/userService"
import Table from 'react-bootstrap/Table'
import { Button } from "react-bootstrap"
import '../styles/DashboardAdmin.css'

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
    return (
    <div>
        <h3>Users</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.username}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td><Button className="deleteButton" variant="danger">Delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
    )
}

export default DashboardAdmin
