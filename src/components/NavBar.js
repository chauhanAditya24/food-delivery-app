import React, { useState } from "react"
import { Link, withRouter } from "react-router-dom"
import Badge from "react-bootstrap/Badge"
import Modal from "../pages/Modal"
import Cart from "../pages/Cart"
import { useCart } from "./ContextReducer"

const NavBar = (props) => {

    const [cartView, setCartView] = useState(false)
    let data = useCart()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('login')
        props.history.push('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to='/'> <img height={60} width={70} alt='foodtruck' src={require('../images/food-truck.png')} />  FDA</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to='/'> <h4> home </h4> </Link>
                            </li>

                            {
                                (localStorage.getItem('token')) && (

                                    <li className="nav-item">
                                        <Link className="nav-link active fs-5" aria-current="page" to='/myOrder'><h4> orders</h4></Link>
                                    </li>

                                )
                            }


                        </ul>
                        {(!localStorage.getItem('token')) ? (
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1" aria-current="page" to='/login'>login</Link>

                                <Link className="btn bg-white text-success mx-1" aria-current="page" to='/register'>SignUp</Link>
                            </div>
                        )
                            : (
                                <div>
                                    <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                                        My Cart{" "}
                                        <Badge pill bg='danger'>{data.length}</Badge>
                                    </div>
                                    {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /> </Modal> : null}
                                    <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                                        Logout
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(NavBar) 