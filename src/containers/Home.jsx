import React from "react"
import Carousel from "react-bootstrap/Carousel"
import Image from 'react-bootstrap/Image'
const Home = () => {
    return (
        <div>
            <Carousel style={{ width: "75%", margin: "auto", borderRadius: "15px 15px 15px 15px", overflow: "hidden" }}>
                <Carousel.Item>
                    <Image rounded
                        className="d-block w-100"
                        src="https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1459190417/Boeing-TEST0316.jpg?itok=hExHhy9s"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Unlimited Adventures</h3>
                        <p>Our airlines can take you virtually anywhere in the world in order the experience the world fully</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="https://wallpapercave.com/wp/9aungfd.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Luxurious Flights</h3>
                        <p>Enjoy several beverages, refreshments, and comfortable seating for an overall lavish experience</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="https://wonderfulengineering.com/wp-content/uploads/2014/05/airplane-wallpaper-3.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Additional Features</h3>
                        <p>Our planes also include heated floors and nightime mode for any time of the day for any passenger</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
export default Home