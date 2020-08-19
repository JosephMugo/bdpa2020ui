import React, { useState, useEffect } from "react"
import { requestAllUsers } from "../services/userService";
const DashboardAdmin = () => {
    const [gotUsers, setGotUsers] = useState(false);

    const getUserInfo = async () => {
        setGotUsers(true)
        const requestedUsers  = await requestAllUsers()
        console.log("users", requestedUsers)
    }
    useEffect(() => {
        if (!gotUsers) { getUserInfo() }
    })
    return (
    <div>
       These are your tickets
    </div>
    )
}

export default DashboardAdmin
