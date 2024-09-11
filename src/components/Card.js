import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {

    const { foodItem, options } = props

    let priceOptions = Object.keys(options)

    // let { foodItem } = props
    let dispatch = useDispatchCart()

    let data = useCart()

    // console.log('data in card ' , data)

    const [login , setLogin] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('login')) {
            setLogin(false)
        } else {
            setLogin(true)
        }
    }, [])


    const [qty, setQty] = useState(1)
    const [size, setSize] = useState('')

    const pirceRef = useRef()

    useEffect(() => {
        setSize(pirceRef.current.value)
    }, [])

    let finalPrice = qty * parseInt(options[size])

    const handleAddToCart = async () => {

        console.log('food item', foodItem)
        console.log('data ', data)

        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item
                break
            }
        }

        if (food.length !== 0) {
            if (food.size === size) {
                console.log('update in card :', foodItem)
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return
            } else if (food.size != size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: foodItem.img })
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: foodItem.img })
    }


    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: '360px' }}>
                    <img src={foodItem.img} className="card-img-top" alt="..." style={{ height: '126px', objectFit: 'fill' }} />
                    <div className="card-body">
                        <h5 className="card-title">{foodItem.name}</h5>
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                                {
                                    Array.from(Array(6), (ele, i) => {
                                        return (
                                            <option key={i + 1}> {i + 1} </option>
                                        )
                                    })
                                }
                            </select>

                            <select className="m-2 h-100  bg-success rounded" ref={pirceRef} onChange={(e) => setSize(e.target.value)}>
                                {
                                    priceOptions.map((ele) => {
                                        return <option key={ele} value={ele}>{ele}</option>
                                    })
                                }
                            </select>
                            <div className="d-inline h-100 fs-5">
                                Rs {finalPrice}
                            </div>
                        </div>
                        {

                            login && (
                                <>
                                    <hr />
                                    <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart} >Add to cart</button>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card