import superagent from "superagent";
import Cookies from "universal-cookie";
const baseUserURL = "http://localhost:3535"

export const createUser = async (user) => {

    const addUrl = baseUserURL + '/user/add'
    const response = await superagent.post(addUrl, user)

    console.log("Response", response)

    return
}

export const logUserIn = async (user, password) => {
    const postBody = { user }
    const base64String = Buffer.from(`${user}:${password}`, 'ascii').toString("base64")
    const headers = {
        Authorization: `Basic ${base64String}`
    }

    const tokenUrl = baseUserURL + '/token'

    const response = await superagent.post(tokenUrl, postBody).set(headers)

    if (response.status === 401) return false

    console.log("RESPONSE FROM TOKEN? ", response)

    const token = response.body.token

    const cookies = new Cookies();

    cookies.set('userToken', token)

    return true
}