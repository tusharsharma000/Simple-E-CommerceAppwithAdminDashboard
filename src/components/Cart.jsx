import React from 'react'
import { useCart } from './CartContext'

function Cart() {
    const {cart, removeFromCart, incrementQuantity, decrementQuantity} = useCart();
  return (
    <div className='p-4'>
        <h2 className='text-xl mb-4'>Cart</h2>
        {cart?.length === 0? (
            <p>No Items in Cart</p>
        ): (cart.map((item, index) => (
            <>
            <div key={index} className='border p-2 mb-2'>
                {item.name} - ${item.price} - Quantity {item.quantity}
                <p>Total: ${item.price *item.quantity}</p>
            </div>
            <div className='flex items-center gap-2 mb-2'>
                <button
                    className='bg-gray-200 px-2 rounded'
                    onClick={() => decrementQuantity(item.id)}
                >-</button>
                <span>Qty: {item.quantity}</span>
                <button
                    className='bg-gray-200 px-2 rounded'
                    onClick={() => incrementQuantity(item.id)}
                >+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)}> Remove</button>
            </>
        ))
        )}
    </div>
  )
}

export default Cart;