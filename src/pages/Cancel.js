import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'

const Cancel = (props) => {

    const location = useLocation()

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search)
        const email = searchParams.get('email')
        if(email){
            localStorage.setItem('email')
        }

        setTimeout(() => {
            props.history.push('/   ')
        }, 7000)
    } , [props.history,location])

    console.log('localstorage : ' , localStorage.getItem('email'))

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className='container'>
                <div className='d-flex flex-column align-items-center justify-content-center' style={{height:'70vh'}}>
                    <img
                        src={require('../images/failed.png')}
                        height={200}
                        width={200}
                        alt='failed'
                    />
                    <h3 className='mt-3'> Transcation failed </h3>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}


export default Cancel