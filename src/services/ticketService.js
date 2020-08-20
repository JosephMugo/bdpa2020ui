import superagent from "superagent";
import Cookies from "universal-cookie";
const baseUserURL = "http://localhost:3535"

const cookies = new Cookies()
export const addTicket = async (flight_id, seatType, seatNum) => {
    const token = cookies.get("userToken"), email = cookies.get("email")
    const headers = { Authorization: `Bearer ${token}` }
    const postBody = { email, flight_id, seatType, seatNum }
    const addTicketURL = baseUserURL + '/ticket/add'
    try {
        await superagent.post(addTicketURL, postBody).set(headers)
        console.log("Ticket saved")
        return true
    } catch (err) { console.log(err) }
    return false
}
export const requestUserTickets = async email => {
    console.log("Requesting tickets", email)
    const token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + '/ticket/get'
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

export const requestffms = async email => {
    console.log("Requesting", email)
    const token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }
    const getUrl = baseUserURL + '/user/get'
    try {
        const response = await superagent.get(getUrl, email).set(headers)
        return response.body.ffms
    } catch (err) {
        if (err.status === 400) console.log("User not Found")
        if (err.status === 401) console.log("Unauthorized")
        else console.log("error", err)
    }
    return false
}

export const addffms = async ffms_num => {
    console.log("Adding ffms")
    const originalValue = await requestffms(cookies.get("email"))
    const newValue = ffms_num + originalValue
    console.log("New value:", newValue)

    const token = cookies.get("userToken")
    const headers = { Authorization: `Bearer ${token}` }

    const updateUrl = baseUserURL + '/user/update'
    try {
        const response = await superagent.post(updateUrl, { ffms: newValue }).set(headers)
        return response.body
    } catch (err) {
        if (err.status === 401) console.log("Bad credentials")
        else console.log("error", err)
    }
    return false
}