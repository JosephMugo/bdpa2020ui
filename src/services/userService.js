import superagent from "superagent";
import Cookies from "universal-cookie";
const baseUserURL = "http://localhost:3535"

export const createUser = async (user) => {
    // console.log(user)
    const addUrl = baseUserURL + '/user/add'
    try {
        await superagent.post(addUrl, user)
        return true
    } catch (err) {
        if (err.status === 409) { console.log("Username taken") }
        else console.log("Bad credentials")
    }
    return false
}

export const login = async (user) => {
    const { username, firstName, lastName, password } = user
    const base64String = Buffer.from(`${username}:${firstName}:${lastName}:${password}`, 'ascii').toString("base64")
    console.log(base64String)
    const headers = { Authorization: `Basic ${base64String}` }
    const tokenUrl = baseUserURL + '/token'
    const response = await superagent.post(tokenUrl, username).set(headers)
    if (response.status === 401) return false

    console.log("RESPONSE FROM TOKEN? ", response)

    const token = response.body.token

    const cookies = new Cookies();

    cookies.set('userToken', token)

    return true
}