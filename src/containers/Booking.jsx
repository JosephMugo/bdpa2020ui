import React from "react"
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from "react-bootstrap"

const Bookings = (flights) => {
    if (flights === true) { //if there coming from the flights section it'll skip asking them where and when they wanna go
        return (
            <div>this is an empty div</div>
        )
    } else {
        return (
            <div>
                <InputGroup className="mb-3" style={{ width: "300px" }}>
                <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Location:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="City"
                        aria-label="Month"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>

                <InputGroup className="mb-3" style={{ width: "250px" }}>
                    <FormControl
                        placeholder="MM"
                        aria-label="Month"
                        aria-describedby="basic-addon1"
                    />
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">/</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="DD"
                        aria-label="Day"
                        aria-describedby="basic-addon1"
                    />
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">/</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="YY"
                        aria-label="Year"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>

                <InputGroup className="mb-3" style={{ width: "300px" }}>
                <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">First Name:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="FirstName"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3" style={{ width: "300px" }}>
                <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Middle Name:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Optional"
                        aria-label="MiddleName"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3" style={{ width: "300px" }}>
                <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Last Name:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="LastName"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3" style={{ width: "300px" }}>
                <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Sex:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        aria-label="Sex"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>

                <InputGroup className="mb-3" style={{ width: "350px" }}>
                <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Brithday:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="MM"
                        aria-label="Month"
                        aria-describedby="basic-addon1"
                    />
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">/</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="DD"
                        aria-label="Day"
                        aria-describedby="basic-addon1"
                    />
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">/</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="YY"
                        aria-label="Year"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            Card info and what not: exp date, zip code, type of card
            If logged in ask to save info to not type it later
            Select seat number
            How many bags
            first is free second carry on is $30 second checked is $50 and more is $100
            max 2 carry-on and 5 checked
            must book 24 hours before flight
            </div>
        )
    }
}

export default Bookings