import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    const handleCheckOut = async() => {

        const stripe = await loadStripe('pk_test_51OPQrWSCsP2MbOhT82Il1vqqebcmSAweSnxmleh4UrBZwIfdo7IVvXh92Ju10pt3uFhSU6c4wmNwMbFxDczfdwR500zPvhV4Kc')

        const userEmail = localStorage.getItem('email')

        let respone = await fetch('http://localhost:3066/fda/checkout' , {
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                order_data : data,
                email:userEmail,
            })
        })

        // const result = await respone.json()
        // console.log("response from backend" , result)

        // let respone = await fetch('http://localhost:3066/fda/orderData' , {
        //     method: 'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify({
        //         order_data: data,
        //         email:userEmail,
        //         order_date : new Date().toDateString()
        //     })
        // })

        const session = await respone.json()

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })

        // if(respone.status === 200){
        //     dispatch({ type: 'DROP'})
        // }

        if(result.error){
            console.log(result.error);
        }

    }

    return (
        <div>

            {console.log(data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0 btn-danger" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Remove</button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>



        </div>
    )
}

export default Cart













// const handleCheckOut = async () => {
//     let userEmail = localStorage.getItem("userEmail");
//     // console.log(data,localStorage.getItem("userEmail"),new Date())
//     let response = await fetch("http://localhost:5000/api/auth/orderData", {
//         // credentials: 'include',
//         // Origin:"http://localhost:3000/login",
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             order_data: data,
//             email: userEmail,
//             order_date: new Date().toDateString()
//         })
//     });
//     console.log("JSON RESPONSE:::::", response.status)
//     if (response.status === 200) {
//         dispatch({ type: "DROP" })
//     }
// }
