import { useEffect, useState } from "react"
import Card from "../components/Card"
import Carousal from "../components/Carousal"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

const Home = () => {

    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])


    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const loadData = async () => {
        let response = await fetch('http://localhost:3066/fda/data', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response = await response.json()
        // console.log('food items ', response[0])
        // console.log('food category ', response[1])

        setFoodItem(response[0])
        setFoodCat(response[1])

    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <div>
                <NavBar />
            </div>
            {/* <div> <Carousal /> </div> */}
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride='carousel'>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption justify-content-center" style={{ zIndex: '10' }}>
                        <div className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                value={search}
                                onChange={handleChange}
                            />
                            <button className="btn btn-outline-success bg-success text-white" type="submit">Search</button>
                        </div>

                    </div>

                    <div className="carousel-item active">
                        <img src='https://picsum.photos/200/300' className="d-block w-100" alt="1" style={{ filter: 'brightness(30%)' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/id/237/200/300" className="d-block w-100" alt="2" style={{ filter: 'brightness(30%)' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/id/27/200/300" className="d-block w-100" alt="3" style={{ filter: 'brightness(30%)' }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container">
                {
                    foodCat.length > 0 ? (
                        foodCat.map((data) => {
                            return (
                                <div key={data._id} className="row mb-3">
                                    <div key={data._id} className="fs-3 m-3">
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItem.length > 0 ? (

                                            foodItem.filter((item) => {
                                                return (data.CategoryName === item.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))
                                            }).map((ele) => {
                                                return (
                                                    <div key={ele._id} className="col-12 col-md-6 col-lg-3">
                                                        <Card
                                                            foodName={ele.name}
                                                            options={ele.options[0]}
                                                            img={ele.img}
                                                        />
                                                    </div>
                                                )
                                            })

                                        ) : <div> No Such Data Found</div>
                                    }
                                </div>
                            )
                        })
                    ) : ""
                }
            </div>

            <div> <Footer /> </div>
        </div>
    )

}

export default Home