import React from "react";

const Card = (props) => {

    const {foodName , options , img} = props    

    let priceOptions = Object.keys(options)

    return (

        <div>

            <div>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: '360px' }}>
                    <img src={img} className="card-img-top" alt="..." style={{height:'200px', width:'286px'}} />
                    <div className="card-body">
                        <h5 className="card-title">{foodName}</h5>
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded">
                                {
                                    Array.from(Array(6), (ele, i) => {
                                        return (
                                            <option key={i + 1}> {i + 1} </option>
                                        )
                                    })
                                }
                            </select>

                            <select className="m-2 h-100  bg-success rounded">
                                {
                                    priceOptions.map((ele) => {
                                        return <option key={ele} value={ele}>{ele}</option>
                                    })
                                }
                            </select>
                            <div className="d-inline h-100 fs-5">
                                Total Price
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Card