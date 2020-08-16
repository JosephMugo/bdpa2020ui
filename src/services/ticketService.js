import superagent from "superagent";
import Cookies from "universal-cookie";
const baseUserURL = "http://localhost:3535"

export const addTicket = async (flight_id) => {


    const cookies = new Cookies()

    const token = cookies.get("userToken")

    const user = cookies.get("username")
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const postBody = {user,flight_id }

    const addTicketURL = baseUserURL + '/ticket/add'

    const response = await superagent.post(addTicketURL, postBody).set(headers)

    console.log("WHAT?! ", response)

}