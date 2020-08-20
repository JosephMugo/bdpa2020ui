import superagent from "superagent";
import Cookies from "universal-cookie";
const baseUserURL = "http://localhost:3535"

const cookies = new Cookies()
export const addTicket = async (flight_id, seat) => {
    const token = cookies.get("userToken"), email = cookies.get("email")
    const headers = { Authorization: `Bearer ${token}` }
    const postBody = { email, flight_id, seat }
    const addTicketURL = baseUserURL + '/ticket/add'
    try {
        await superagent.post(addTicketURL, postBody).set(headers)
        console.log("Ticket saved")
        return true
    } catch (err) {
        if (err.status === 400) console.log(400)
        console.log(err)
    }
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