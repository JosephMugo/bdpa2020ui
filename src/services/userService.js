import superagent from "superagent";
import Cookies from "universal-cookie";
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
        if (err.status === 409) { console.log("Username taken") }
        else console.log("Bad credentials")
    }
    return false
}
export const login = async user => {
    const { username, firstName, lastName, password } = user
    const base64String = Buffer.from(`${username}:${firstName}:${lastName}:${password}`, 'ascii').toString("base64")
    console.log(base64String)
    const headers = { Authorization: `Basic ${base64String}` }
    const tokenUrl = baseUserURL + '/token'
    try {
        const response = await superagent.post(tokenUrl, username).set(headers)
        const { token, role } = response.body
        console.log("token", token)
        console.log(username, role)
        cookies.set('username', username)
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

export const forgotPassword = async (user) => {
    const { username, securityQuestion1, securityQuestion2, securityQuestion3 } = user
    console.log(`${username}:${securityQuestion1}:${securityQuestion2}:${securityQuestion3}`)
    const base64String = Buffer.from(`${username}:${securityQuestion1}:${securityQuestion2}:${securityQuestion3}`, 'ascii').toString("base64")
    console.log(base64String)
    const headers = { Authorization: `SecurityQuestion ${base64String}` }
    const tokenUrl = baseUserURL + '/token'
    try {
        const response = await superagent.post(tokenUrl, username).set(headers)
        const { token, role } = response.body
        console.log("token", token)
        console.log(username, role)
        cookies.set('username', username)
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

export const requestUserInfo = async (username) => {
    console.log("Requesting", username)
    const cookies = new Cookies(), token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + '/user/get'
    try {
        const response = await superagent.get(getUrl, username).set(headers)
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
export const requestUserRole = async (username) => {
    console.log("Requesting user role for: ", username)
    const cookies = new Cookies(), token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + '/user/getCredentials'
    try {
        const response = await superagent.get(getUrl, username).set(headers)
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