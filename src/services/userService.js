import superagent from "superagent";
import Cookies from "universal-cookie";
import { requestUserTickets } from '../services/ticketService'
import { requestFlights } from './flightService'
import { set } from "date-fns";

const baseUserURL = "http://localhost:3535"

const cookies = new Cookies()
export const rememberMe = async (remember = false) => {
    try {
        if (remember) cookies.set('rememberMe', remember)
        else cookies.remove("rememberMe")
    } catch (err) { console.log("error", err) }
    return false
}
export const createUser = async user => {
    // console.log(user)
    const addUrl = baseUserURL + '/user/add'
    try {
        await superagent.post(addUrl, user)
        console.log("User registered")
        return true
    } catch (err) {
        if (err.status === 409) { console.log("Email taken") }
        else console.log("Bad credentials")
    }
    return false
}
export const login = async user => {
    const { email, password } = user
    const base64String = Buffer.from(`${email}:${password}`, 'ascii').toString("base64")
    console.log(base64String)
    const headers = { Authorization: `Basic ${base64String}` }
    const tokenUrl = baseUserURL + '/token'
    const getUrl = baseUserURL + '/user/get'

    try {
        const response = await superagent.post(tokenUrl, email).set(headers)
        const { token, role } = response.body
        console.log("token", token)
        console.log(email, role)
        cookies.set('email', email)
        cookies.set('userToken', token)
        cookies.set('role', role)
        const headers2 = { Authorization: `Bearer ${token}` }
        const response2 = await superagent.get(getUrl, email).set(headers2)
        cookies.set('firstName', response2.body.firstName)
        const requestedUserTickets = await requestUserTickets(email)
        let userTickets = []
        if (requestedUserTickets) { userTickets = (requestedUserTickets.map(ticket => ticket.flight_id)) }
        const flightsInfo = await requestFlights(userTickets)
        console.log("this is flight info", flightsInfo[0].departFromReceiver)
        let maxNum = 0;
        let flight;
        let i;
        for (i = 0; i < flightsInfo.length; i++) {
            if (flightsInfo[i].departFromReceiver > maxNum) {
                maxNum = flightsInfo[i].departFromReceiver
                flight = flightsInfo[i]
            }
        }
        console.log("this is the correct", flight)
        cookies.set("airline", flight.airline)
        cookies.set("flightnumber", flight.flightnumber)
        cookies.set("destination", flight.departingTo)
        cookies.set("departingtime", new Date(flight.departFromReceiver))
        // Remove failed login cookies
        cookies.remove('loginAttempt')
        return true
    } catch (err) {
        if (err.status === 401) {
            console.log("Bad credentials")
            const loginAttempt = cookies.get("loginAttempt")
            if (loginAttempt === '2') cookies.set('loginAttempt', '3')
            else if (loginAttempt === '1') cookies.set('loginAttempt', '2')
            else cookies.set('loginAttempt', '1')
        }
        else console.log("error", err)
    }
    return false
}

export const forgotPassword = async (user) => {
    const { email, securityQuestion1, securityQuestion2, securityQuestion3 } = user
    console.log(`${email}:${securityQuestion1}:${securityQuestion2}:${securityQuestion3}`)
    const base64String = Buffer.from(`${email}:${securityQuestion1}:${securityQuestion2}:${securityQuestion3}`, 'ascii').toString("base64")
    console.log(base64String)
    const headers = { Authorization: `SecurityQuestion ${base64String}` }
    const tokenUrl = baseUserURL + '/token'
    try {
        const response = await superagent.post(tokenUrl, email).set(headers)
        const { token, role } = response.body
        console.log("token", token)
        console.log(email, role)
        cookies.set('email', email)
        cookies.set('userToken', token)
        cookies.set('role', role)

        // Remove failed login cookies
        cookies.remove('loginAttempt')
        return true
    } catch (err) {
        if (err.status === 401) {
            console.log("Bad credentials")
            const loginAttempt = cookies.get("loginAttempt")
            if (loginAttempt === '2') cookies.set('loginAttempt', '3')
            else if (loginAttempt === '1') cookies.set('loginAttempt', '2')
            else cookies.set('loginAttempt', '1')
        }
        else console.log("error", err)
    }
    return false
}

export const requestUserInfo = async email => {
    console.log("Requesting", email)
    const cookies = new Cookies(), token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + '/user/get'
    try {
        const response = await superagent.get(getUrl, email).set(headers)
        return response.body
    } catch (err) {
        if (err.status === 400) console.log("User not Found")
        if (err.status === 401) console.log("Unauthorized")
        else console.log("error", err)
    }
    return false
}
export const updateUserInfo = async user => {
    const token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const updateUrl = baseUserURL + '/user/update'
    try {
        const response = await superagent.post(updateUrl, user).set(headers)
        return response.body
    } catch (err) {
        if (err.status === 401) console.log("Bad credentials")
        else console.log("error", err)
    }
    return false
}

// Get user role
export const requestUserRole = async email => {
    console.log("Requesting user role for: ", email)
    const cookies = new Cookies(), token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + '/user/getCredentials'
    try {
        const response = await superagent.get(getUrl, email).set(headers)
        return response.body
    } catch (err) {
        if (err.status === 400) console.log("User not Found")
        if (err.status === 401) console.log("Unauthorized")
        else console.log("error", err)
    }
    return false
}

// Get all users 
export const requestAllUsers = async () => {
    console.log("Requesting users")
    const cookies = new Cookies(), token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + '/user/getAllUsers'
    try {
        const response = await superagent.get(getUrl).set(headers)
        return response.body
    } catch (err) {
        if (err.status === 400) console.log("Users not Found")
        if (err.status === 401) console.log("Unauthorized")
        else console.log("error", err)
    }
    return false
}

// Delete user 
export const requestDeleteUser = async email => {
    const cookies = new Cookies(), token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + `/user/deleteUser/${email}`
    try {
        const response = await superagent.delete(getUrl, email).set(headers)
        console.log(response)
        return response.body
    } catch (err) {
        if (err.status === 400) console.log("User not Found")
        if (err.status === 401) console.log("Unauthorized")
        else console.log("error", err)
    }
    return false
}

// Update Ban state
export const requestUserBan = async email => {
    console.log("Requesting user role for: ", email)
    const cookies = new Cookies(), token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + `/user/ban/${email}`
    try {
        const response = await superagent.post(getUrl, email).set(headers)
        return response.body
    } catch (err) {
        if (err.status === 400) console.log("User not Found")
        if (err.status === 401) console.log("Unauthorized")
        else console.log("error", err)
    }
    return false
}