import superagent from "superagent";
import Cookies from "universal-cookie";
const baseUserURL = "http://localhost:3535"

const cookies = new Cookies()
export const addTicket = async (flight_id) => {
    const token = cookies.get("userToken"), user = cookies.get("username")
    const headers = { Authorization: `Bearer ${token}` }
    const postBody = { user, flight_id }
    const addTicketURL = baseUserURL + '/ticket/add'
    try {
        const response = await superagent.post(addTicketURL, postBody).set(headers)
        console.log("addTicket response", response)
        return true
    } catch (err) {
        console.log(err)
    }
    return false

}