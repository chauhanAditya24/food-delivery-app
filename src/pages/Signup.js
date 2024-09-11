import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Signup = () => {

    const [data, setData] = useState({ email: "", password: "", name: "", location: "" })

    const handelChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:3066/fda/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name: data.name, email: data.email, location: data.location, password: data.password })
        })

        const json = await response.json()

        console.log('respone', json)

        if (!json.success) {
            alert('something went wrong')
        }
    }

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="container mt-3">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="name" className="form-label">Name</label>
                        <input type="text" class="form-control" name="name" value={data.name} onChange={handelChange} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={data.email} onChange={handelChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"
                            name="password" value={data.password} onChange={handelChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Location</label>
                        <input type="text" class="form-control"
                            name="location" value={data.location} onChange={handelChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger '>Already a user</Link>
                </form>
            </div>

            <div>
                <Footer/>
            </div>
        </>
    )
}

export default Signup