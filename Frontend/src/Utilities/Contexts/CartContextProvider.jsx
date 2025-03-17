"use client"
import React, { createContext, useEffect, useState } from 'react';
export const CartContext = createContext({})

const CartContextProvider = ({children}) => {

    const [cart, setCart] = useState([])
    const deliveryCharge = 60

    useEffect(()=>{
        const cartItems = JSON.parse(localStorage.getItem("cart"))
    
        setCart(cartItems || [])
    },[])

    const subTotal = cart?.reduce((accumulator, cartItem) => accumulator + (cartItem?.price * cartItem?.quantity), 0)

    const grandTotal = subTotal + deliveryCharge


    const addToCart = (item) =>{

        const existingItem = cart.find(cartItem => cartItem?.productID === item?.productID)

        if(existingItem){
            const newCart = cart?.filter(cartItem => cartItem?.productID !== item?.productID)

            localStorage.setItem("cart", JSON.stringify([...newCart, item]))
            setCart([item,...newCart])
            return
        }

        localStorage.setItem("cart", JSON.stringify([...cart, item]))
        setCart([item, ...cart])
    }

    const removeFromCart = (id) =>{
        const deletedCart = cart?.filter(item => item?.productID !== id)

        localStorage.setItem("cart", JSON.stringify(deletedCart))
        setCart(deletedCart)
    }

    const increaseQuantity = (id) =>{
        const existingItem = cart.find(cartItem => cartItem?.productID === id)

        if(existingItem){
            const index = cart.indexOf(existingItem)
            const newCart = [...cart]

            existingItem.quantity = existingItem?.quantity + 1

            newCart[index] = existingItem

            localStorage.setItem("cart", JSON.stringify([...newCart]))
            setCart([...newCart])
            return
        }
    }

    const decreaseQuantity = (id) =>{
        const existingItem = cart.find(cartItem => cartItem?.productID === id)

        if(existingItem){
            const index = cart.indexOf(existingItem)
            const newCart = [...cart]

            if(existingItem.quantity > 1){
                existingItem.quantity = existingItem?.quantity - 1
            }

            newCart[index] = existingItem

            localStorage.setItem("cart", JSON.stringify([...newCart]))
            setCart([...newCart])
            return
        }
    }

    const value = {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        subTotal: subTotal.toLocaleString(2),
        deliveryCharge,
        grandTotal: grandTotal.toLocaleString(2)
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;