import React from "react"
import Carousel from "react-bootstrap/Carousel"
import Image from 'react-bootstrap/Image'
const Home = () => {

    return (
        <div>
            <h1 style={{ textAlign:"center"}} >Welcome</h1>
            <Carousel style={{width: "75%", margin: "auto",borderRadius:"55px 55px 55px 55px",overflow: "hidden"}}>
                <Carousel.Item>
                    <Image rounded
                    className="d-block w-100"
                    src="https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1459190417/Boeing-TEST0316.jpg?itok=hExHhy9s"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Planes</h3>
                    <p>For all your booking needs</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src="https://wallpapercave.com/wp/9aungfd.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Another Plane</h3>
                    <p>Plane knowledge</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src="https://wonderfulengineering.com/wp-content/uploads/2014/05/airplane-wallpaper-3.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Planes</h3>
                    <p>Description</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Home