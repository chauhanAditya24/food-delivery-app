import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import { useDispatchCart } from "../components/ContextReducer";

const Success = (props) => {

    const location = new useLocation()
    const [orderData, setOrderData] = useState([])
    const [email, setEmail] = useState('')

    let dispatch = useDispatchCart();

    useEffect(() => {
        // Define an async function inside the useEffect
        const fetchOrderData = async () => {
            const searchParams = new URLSearchParams(location.search);
            const orderDataParam = searchParams.get('order_data');
            // console.log('order decoded data' , orderDataParam)
            const emailParam = searchParams.get('email');
            console.log('emial PAram ' , emailParam)
            if (emailParam) {
                const decodedEmail = decodeURIComponent(emailParam);
                console.log('Email from success:', decodedEmail);
                localStorage.setItem('email', decodedEmail); // Store the decoded email
                setEmail(decodedEmail); // Set the email in state
            } else {
                console.error('Email parameter not found in URL');
            }

            if (orderDataParam && emailParam) {
                const decodedOrderData = JSON.parse(decodeURIComponent(orderDataParam));
                setOrderData(decodedOrderData);
                const decodedEmail = JSON.parse(decodeURIComponent(emailParam))
                setEmail(emailParam)

                try {
                    let response = await fetch('http://localhost:3066/fda/orderData', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            order_data: decodedOrderData, // Use decodedOrderData from state
                            email: decodedEmail, // Use decoded email from state
                            order_date: new Date().toDateString(),
                        }),
                    });

                    if (response.status === 200) {
                        // Dispatch the action to clear the cart here
                        dispatch({ type: 'DROP' });
                        localStorage.removeItem('email')
                        localStorage.removeItem('token')
                        props.history.push('/')
                    }
                } catch (error) {
                    console.error('Failed to send order data:', error);
                }
            }
        };

        fetchOrderData(); // Call the async function
    }, [location.search, dispatch]);

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className='container'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '70vh' }}>
                    <img
                        src={require('../images/checked.png')}
                        height={200}
                        width={200}
                        alt='success'
                    />
                    <h3 className='mt-3'> Transcation Successfull ! </h3>
                    <h5 className='mt-2'> Mail will be sent to your registered email ID. </h5>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Success