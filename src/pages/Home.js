import { useEffect, useState } from "react"
import Card from "../components/Card"
import Carousal from "../components/Carousal"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"

const Home = () => {

    // console.log('local Item' , localStorage.getItem('ren'))
    // let login = false
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
        // if(!localStorage.getItem('login')){
        //     login = false
        // }else{
        //     login = true
        // }
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
                        <img src='https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGZyaWVkJTIwcmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60' className="d-block w-100" alt="1" style={{ filter: 'brightness(30%)' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMHRpa2thfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="2" style={{ filter: 'brightness(30%)' }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0=" className="d-block w-100" alt="3" style={{ filter: 'brightness(30%)' }} />
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
                                                            foodItem = {ele}
                                                            // foodName={ele.name}
                                                            options={ele.options[0]}
                                                            // img={ele.img}
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