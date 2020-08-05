import superagent from "superagent";
import Cookies from "universal-cookie";
const baseUserURL = "http://localhost:3535"

export const createUser = async (user) => {
    // console.log(user)
    const addUrl = baseUserURL + '/user/add'
    try {
        const response = await superagent.post(addUrl, user)
        console.log("Response", response)
    } catch (err) {
        console.log("fdsasdf", err)
    }
    // console.log(response.status)
    // if(response.status===401) console.log("User taken")
    return
}

export const login = async (user) => {
    const { username, firstName, lastName, password } = user
    const postBody = { username }
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