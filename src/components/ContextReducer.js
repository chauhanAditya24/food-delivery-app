import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {

        case "ADD":
            console.log('on adding from reducer', action)
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size, img: action.img }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr

        case "UPDATE":
            let arr = [...state]
            console.log('inside the update : ', arr)
            arr.find((food, index) => {
                if (food.id === action.id) {
                    // console.log(food.qty , parseInt(action.qty) , action.price, food.price)
                    console.log('dood ', food)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr

        case "DROP": 
            let empArr = []
            return empArr

        default:
            console.log('error in reducer')
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )

}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)