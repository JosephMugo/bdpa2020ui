import React from "react"
import {
    BrowserRouter as Router,
    //Switch,
    Route,
   // Link
  } from "react-router-dom";
  import Booking from "./containers/Booking"
  import Tickets from "./containers/Tickets"
  import Home from "./containers/Home"
const App = () => {
    
    return (<div>
        <Router>
         {/* <Route exact path="/home" component={Home}/>  */}
        {/* <Route exact path="/flights" component={FlightsPage}/> */}
        <Route exact path="/booking" component={Booking}/>
        <Route exact path="/tickets" component={Tickets}/>
        <Route exact path="/" component={Home}/>
        </Router>
    </div>)
}

export default App