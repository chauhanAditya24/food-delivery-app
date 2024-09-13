import React, { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const MyOrder = () => {

    const [orderData, setOrderData] = useState({})

    const fetchMyOrder = async () => {
        const email = localStorage.getItem("email");
        if (!email) return; // Ensure the email exists before proceeding
        console.log(email);
        await fetch("http://localhost:3066/fda/myOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
            .then(async (res) => {
                const response = await res.json();
                console.log('response in  my order', response)
                setOrderData(response); // No need for `await` here
            })
            .catch((err) => {
                console.error("Error fetching orders: ", err);
            });
    };

    useEffect(() => {
        fetchMyOrder()
    }, []);


    // const fetchMyOrder = async () => {
    //     console.log(localStorage.getItem('email'))
    //     await fetch("http://localhost:3066/fda/myOrder", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             email: localStorage.getItem('email')
    //         })
    //     }).then(async (res) => {
    //         let response = await res.json()
    //         await setorderData(response)
    //     })


    // }

    // useEffect(() => {
    //     fetchMyOrder()
    // }, [])

    return (
        <div>
            <div>
                <NavBar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData != {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <Footer />
        </div>
    )
}

export default MyOrder
