import React, { useState } from "react";

const Carousal = () => {

    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div>
            <div>
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
            </div>
        </div>
    )

}


export default Carousal 