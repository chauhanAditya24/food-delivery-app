import React, { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const Login = (props) => {


    const [data, setData] = useState({ email: "", password: "" })

    const handelChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:3066/fda/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: data.email, password: data.password })
        })

        const json = await response.json()

        // console.log('respone', json)

        if (!json.success) {
            alert('something went wrong')
        } else {
            localStorage.setItem('email', json.email)
            localStorage.setItem('token', json.token)
            localStorage.setItem('login' , true)
            props.history.push('/')
        }
    }

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="container mt-3 flex-grow-1">
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={data.email} onChange={handelChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"
                            name="password" value={data.password} onChange={handelChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to='/register' className='m-3 btn btn-danger '>Create user</Link>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )

}

export default Login